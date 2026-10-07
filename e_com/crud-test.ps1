# Chay: powershell -ExecutionPolicy Bypass -File .\crud-test.ps1
# Yeu cau: server dang chay (npm run dev), PROTECT_ROUTES=false
param([string]$Base = "http://localhost:3000")

$script:pass = 0
$script:fail = 0

function Call($method, $path, $body) {
    $p = @{ Uri = "$Base$path"; Method = $method; ContentType = "application/json" }
    if ($body) { $p.Body = ($body | ConvertTo-Json) }
    Invoke-RestMethod @p
}

# Chay mot buoc, ky vong thanh cong
function Step($name, [scriptblock]$action) {
    try {
        $r = & $action
        Write-Host "PASS  $name" -ForegroundColor Green
        $script:pass++
        return $r
    } catch {
        Write-Host "FAIL  $name -> $($_.Exception.Message)" -ForegroundColor Red
        $script:fail++
        return $null
    }
}

# Chay mot buoc, ky vong loi voi ma HTTP cu the
function ExpectStatus($name, $code, [scriptblock]$action) {
    try {
        & $action | Out-Null
        Write-Host "FAIL  $name -> khong bao loi (ky vong $code)" -ForegroundColor Red
        $script:fail++
    } catch {
        $got = [int]$_.Exception.Response.StatusCode
        if ($got -eq $code) {
            Write-Host "PASS  $name (HTTP $got)" -ForegroundColor Green
            $script:pass++
        } else {
            Write-Host "FAIL  $name -> HTTP $got (ky vong $code)" -ForegroundColor Red
            $script:fail++
        }
    }
}

function Check($name, $cond) {
    if ($cond) { Write-Host "PASS  $name" -ForegroundColor Green; $script:pass++ }
    else { Write-Host "FAIL  $name" -ForegroundColor Red; $script:fail++ }
}

$s = Get-Random
Write-Host "`n== KET NOI ==" -ForegroundColor Cyan
$h = Step "GET /health" { Call Get "/health" }
if (-not $h -or $h.database -ne "up") {
    Write-Host "`nKhong ket noi duoc DB. Kiem tra SQL Server va .env roi chay lai." -ForegroundColor Red
    exit 1
}

Write-Host "`n== CREATE ==" -ForegroundColor Cyan
$cat  = Step "POST /categories"    { Call Post "/categories" @{ category_name = "Test$s"; description = "tmp" } }
$prod = Step "POST /products"      { Call Post "/products" @{ product_name = "SP test"; price = 100000; quantity = 10; category_id = $cat.category_id } }
$cus  = Step "POST /customers"     { Call Post "/customers" @{ username = "u$s"; password = "Password@123"; email = "u$s@test.com" } }
$ord  = Step "POST /orders"        { Call Post "/orders" @{ user_id = $cus.user_id; shipping_address = "Ha Noi"; total_amount = 0 } }
$det  = Step "POST /order-details" { Call Post "/order-details" @{ order_id = $ord.order_id; product_id = $prod.product_id; quantity = 2 } }
$pay  = Step "POST /payments"      { Call Post "/payments" @{ order_id = $ord.order_id } }
$beh  = Step "POST /behavior"      { Call Post "/behavior" @{ user_id = $cus.user_id; product_id = $prod.product_id; behavior_type = "view"; duration = 30 } }
$mdl  = Step "POST /ai-models"     { Call Post "/ai-models" @{ model_name = "Test"; version = 1; algorithm = "CF" } }
$trn  = Step "POST /training"      { Call Post "/training" @{ model_id = $mdl.model_id; user_id = $cus.user_id; product_id = $prod.product_id; behavior_id = $beh.behavior_id } }
$rec  = Step "POST /recommendations" { Call Post "/recommendations" @{ user_id = $cus.user_id; product_id = $prod.product_id; model_id = $mdl.model_id; score = 0.5 } }

Write-Host "`n== READ ==" -ForegroundColor Cyan
Step "GET /categories"      { Call Get "/categories" } | Out-Null
$c = Step "GET /customers/:id" { Call Get "/customers/$($cus.user_id)" }
Check "customer khong lo password" ($c -and -not ($c.PSObject.Properties.Name -contains "password"))
$o = Step "GET /orders/:id" { Call Get "/orders/$($ord.order_id)" }
Check "total_amount = 200000 (tu tinh)" ($o -and [decimal]$o.total_amount -eq 200000)
Step "GET /products/:id"               { Call Get "/products/$($prod.product_id)" } | Out-Null
Step "GET /order-details/order/:id"    { Call Get "/order-details/order/$($ord.order_id)" } | Out-Null
Step "GET /payments/order/:id"         { Call Get "/payments/order/$($ord.order_id)" } | Out-Null
Step "GET /behavior/user/:id"          { Call Get "/behavior/user/$($cus.user_id)" } | Out-Null
Step "GET /ai-models/:id"              { Call Get "/ai-models/$($mdl.model_id)" } | Out-Null
Step "GET /training/model/:id"         { Call Get "/training/model/$($mdl.model_id)" } | Out-Null
Step "GET /recommendations/user/:id"   { Call Get "/recommendations/user/$($cus.user_id)" } | Out-Null
Step "GET /products?q=&page=1&limit=2" { Call Get "/products?q=SP&page=1&limit=2" } | Out-Null

Write-Host "`n== UPDATE ==" -ForegroundColor Cyan
Step "PUT /categories/:id"    { Call Put "/categories/$($cat.category_id)" @{ description = "da sua" } } | Out-Null
Step "PUT /products/:id"      { Call Put "/products/$($prod.product_id)" @{ price = 150000; quantity = 8 } } | Out-Null
Step "PUT /customers/:id"     { Call Put "/customers/$($cus.user_id)" @{ full_name = "Nguoi Test" } } | Out-Null
Step "PUT /orders/:id"        { Call Put "/orders/$($ord.order_id)" @{ shipping_address = "Hai Phong" } } | Out-Null
Step "PUT /order-details/:id" { Call Put "/order-details/$($det.order_detail_id)" @{ quantity = 3 } } | Out-Null
$o = Call Get "/orders/$($ord.order_id)"
Check "total_amount = 300000 sau khi sua so luong" ([decimal]$o.total_amount -eq 300000)
Step "PUT /behavior/:id"      { Call Put "/behavior/$($beh.behavior_id)" @{ duration = 99 } } | Out-Null
Step "PUT /ai-models/:id"     { Call Put "/ai-models/$($mdl.model_id)" @{ status = "inactive" } } | Out-Null

Write-Host "`n== LOI MONG DOI ==" -ForegroundColor Cyan
ExpectStatus "GET /products/abc"                 400 { Call Get "/products/abc" }
ExpectStatus "POST /products thieu price"        400 { Call Post "/products" @{ product_name = "x" } }
ExpectStatus "POST /customers mat khau ngan"     400 { Call Post "/customers" @{ username = "x$s"; password = "123"; email = "x$s@x.com" } }
ExpectStatus "POST /categories trung ten"        409 { Call Post "/categories" @{ category_name = "Test$s" } }
ExpectStatus "POST /order-details don khong ton tai" 409 { Call Post "/order-details" @{ order_id = 99999999; product_id = $prod.product_id; quantity = 1 } }
ExpectStatus "DELETE /products khi con chi tiet don" 409 { Call Delete "/products/$($prod.product_id)" }

Write-Host "`n== DELETE (thu tu nguoc) ==" -ForegroundColor Cyan
Step "DELETE /recommendations/:id" { Call Delete "/recommendations/$($rec.recommendation_id)" } | Out-Null
Step "DELETE /training/:id"        { Call Delete "/training/$($trn.training_id)" } | Out-Null
Step "DELETE /behavior/:id"        { Call Delete "/behavior/$($beh.behavior_id)" } | Out-Null
Step "DELETE /payments/:id"        { Call Delete "/payments/$($pay.payment_id)" } | Out-Null
Step "DELETE /order-details/:id"   { Call Delete "/order-details/$($det.order_detail_id)" } | Out-Null
$o = Call Get "/orders/$($ord.order_id)"
Check "total_amount ve 0 sau khi xoa het chi tiet" ([decimal]$o.total_amount -eq 0)
Step "DELETE /orders/:id"          { Call Delete "/orders/$($ord.order_id)" } | Out-Null
Step "DELETE /products/:id"        { Call Delete "/products/$($prod.product_id)" } | Out-Null
Step "DELETE /customers/:id"       { Call Delete "/customers/$($cus.user_id)" } | Out-Null
Step "DELETE /categories/:id"      { Call Delete "/categories/$($cat.category_id)" } | Out-Null
Step "DELETE /ai-models/:id"       { Call Delete "/ai-models/$($mdl.model_id)" } | Out-Null
ExpectStatus "GET /products/:id sau khi xoa" 404 { Call Get "/products/$($prod.product_id)" }

Write-Host "`n== TONG KET ==" -ForegroundColor Cyan
Write-Host "PASS: $script:pass   FAIL: $script:fail"
if ($script:fail -gt 0) { exit 1 }
