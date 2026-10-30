import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "./api";
import "./admin-dashboard.css";

const STORE_URL = import.meta.env.VITE_STORE_URL || "http://localhost:5173";

function formatUsdAsVnd(amount) {
  return `${new Intl.NumberFormat("vi-VN").format(Number(amount) * 26000)}đ`;
}

function isInactiveProduct(product) {
  return product.deleted || product.status === "inactive";
}

const EMPTY_PRODUCT = {
  title: "",
  brand: "",
  category: "",
  price: "",
  discountPercentage: 0,
  rating: 0,
  description: "",
  image: "",
  status: "active",
};

async function requestJson(options) {
  const response = await request(options);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(
      data?.message ||
        (response.status === 401
          ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
          : response.status === 403
            ? "Tài khoản hiện tại không có quyền quản trị."
            : `Không thể hoàn tất yêu cầu (HTTP ${response.status}).`),
    );
  }
  if (!data) throw new Error("Máy chủ trả về dữ liệu không hợp lệ.");
  return data;
}

function ProductDialog({ product, onClose, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_PRODUCT,
    ...(product || {}),
    status: product?.deleted ? "inactive" : product?.status || "active",
    image: Array.isArray(product?.images)
      ? product.images.toString().replace(/,/g, ", ") || ""
      : "",
  }));
  const [formError, setFormError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    try {
      await onSave({
        title: form.title.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        discountPercentage: Number(form.discountPercentage),
        rating: Number(form.rating),
        description: form.description.trim(),
        images: form.image.trim() ? form.image.trim().split(",") : [],
        status: form.status,
      });
    } catch (error) {
      setFormError(error.message);
    }
  }

  return (
    <div
      className="admin-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        aria-labelledby="admin-product-dialog-title"
        aria-modal="true"
        className="admin-dialog"
        role="dialog"
      >
        <div className="admin-dialog-heading">
          <div>
            <p className="admin-eyebrow">KHO SẢN PHẨM</p>
            <h2 id="admin-product-dialog-title">
              {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
          </div>
          <button
            aria-label="Đóng"
            className="admin-icon-button"
            disabled={saving}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form className="admin-product-form" onSubmit={handleSubmit}>
          <label className="admin-form-wide">
            Tên sản phẩm
            <input
              autoFocus
              maxLength={200}
              name="title"
              onChange={updateField}
              placeholder="Ví dụ: Tai nghe không dây"
              required
              value={form.title}
            />
          </label>
          <label>
            Thương hiệu
            <input
              maxLength={100}
              name="brand"
              onChange={updateField}
              placeholder="Tên thương hiệu"
              value={form.brand}
            />
          </label>
          <label>
            Danh mục
            <input
              maxLength={100}
              name="category"
              onChange={updateField}
              placeholder="Ví dụ: Điện tử"
              value={form.category}
            />
          </label>
          <label>
            Giá gốc (USD)
            <input
              min="0"
              name="price"
              onChange={updateField}
              required
              step="0.01"
              type="number"
              value={form.price}
            />
          </label>
          <label>
            Giảm giá (%)
            <input
              max="100"
              min="0"
              name="discountPercentage"
              onChange={updateField}
              step="0.1"
              type="number"
              value={form.discountPercentage}
            />
          </label>
          <label>
            Đánh giá
            <input
              max="5"
              min="0"
              name="rating"
              onChange={updateField}
              step="0.1"
              type="number"
              value={form.rating}
            />
          </label>
          <label>
            Trạng thái
            <select name="status" onChange={updateField} value={form.status}>
              <option value="active">Đang bán</option>
              <option value="inactive">Dừng bán</option>
            </select>
          </label>
          <label className="admin-form-wide">
            Đường dẫn hình ảnh
            <input
              name="image"
              onChange={updateField}
              placeholder="https://..."
              type="url"
              value={form.image}
            />
          </label>
          <label className="admin-form-wide">
            Mô tả
            <textarea
              maxLength={5000}
              name="description"
              onChange={updateField}
              placeholder="Mô tả ngắn về sản phẩm"
              rows={3}
              value={form.description}
            />
          </label>

          {formError && (
            <p className="admin-form-error admin-form-wide" role="alert">
              {formError}
            </p>
          )}
          <div className="admin-form-actions admin-form-wide">
            <button
              className="admin-button admin-button-secondary"
              disabled={saving}
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>
            <button
              className="admin-button admin-button-primary"
              disabled={saving}
              type="submit"
            >
              {saving
                ? "Đang lưu..."
                : product
                  ? "Lưu thay đổi"
                  : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogProduct, setDialogProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [deletingSelected, setDeletingSelected] = useState(false);
  const [relistingProductId, setRelistingProductId] = useState(null);

  const fetchProducts = useCallback(async () => {
    const data = await requestJson({ reqPATH: "/admin/products" });
    if (!Array.isArray(data))
      throw new Error("Danh sách sản phẩm không hợp lệ.");
    return data;
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
      setSelectedProductIds((current) =>
        current.filter((id) =>
          data.some((product) => product._id === id && !product.deleted),
        ),
      );
    } catch (error) {
      setLoadError(error.message || "Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((error) => {
        if (!cancelled) {
          setLoadError(error.message || "Không thể tải danh sách sản phẩm.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchProducts]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("vi");
    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [product.title, product.brand, product.category]
          .filter(Boolean)
          .some((value) =>
            value.toLocaleLowerCase("vi").includes(normalizedSearch),
          );
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active"
          ? !isInactiveProduct(product)
          : isInactiveProduct(product));
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const activeCount = products.filter(
    (product) => !isInactiveProduct(product),
  ).length;
  const inactiveCount = products.length - activeCount;
  const discountedCount = products.filter(
    (product) => Number(product.discountPercentage) > 0,
  ).length;
  const selectableVisibleProducts = visibleProducts.filter(
    (product) => !product.deleted,
  );
  const allVisibleSelected =
    selectableVisibleProducts.length > 0 &&
    selectableVisibleProducts.every((product) =>
      selectedProductIds.includes(product._id),
    );

  async function saveProduct(productData) {
    setSaving(true);
    try {
      const editing = Boolean(dialogProduct?._id);
      const data = await requestJson({
        reqPATH: editing
          ? `/admin/products/${encodeURIComponent(dialogProduct._id)}`
          : "/admin/products",
        method: editing ? "PUT" : "POST",
        data: productData,
      });
      setProducts((current) =>
        editing
          ? current.map((item) => (item._id === data._id ? data : item))
          : [data, ...current],
      );
      setDialogOpen(false);
      setDialogProduct(null);
      setNotice(editing ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới.");
      window.setTimeout(() => setNotice(""), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function archiveProduct(product) {
    if (!window.confirm(`Ẩn sản phẩm "${product.title}" khỏi cửa hàng?`))
      return;
    setLoadError("");
    try {
      await requestJson({
        reqPATH: `/admin/products/${encodeURIComponent(product._id)}`,
        method: "DELETE",
      });
      setProducts((current) =>
        current.map((item) =>
          item._id === product._id
            ? { ...item, deleted: true, status: "inactive" }
            : item,
        ),
      );
      setSelectedProductIds((current) =>
        current.filter((id) => id !== product._id),
      );
      setNotice("Đã chuyển sản phẩm vào mục tạm ẩn.");
      window.setTimeout(() => setNotice(""), 3000);
    } catch (error) {
      setLoadError(error.message || "Không thể ẩn sản phẩm.");
    }
  }

  async function relistProduct(product) {
    setRelistingProductId(product._id);
    setLoadError("");
    try {
      const data = await requestJson({
        reqPATH: `/admin/products/${encodeURIComponent(product._id)}`,
        method: "PUT",
        data: {
          title: product.title,
          brand: product.brand,
          category: product.category,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          description: product.description,
          images: Array.isArray(product.images) ? product.images : [],
          status: "active",
        },
      });
      setProducts((current) =>
        current.map((item) => (item._id === data._id ? data : item)),
      );
      setNotice("Đã mở bán lại sản phẩm.");
      window.setTimeout(() => setNotice(""), 3000);
    } catch (error) {
      setLoadError(error.message || "Không thể mở bán lại sản phẩm.");
    } finally {
      setRelistingProductId(null);
    }
  }

  function toggleVisibleProducts() {
    const visibleIds = selectableVisibleProducts.map((product) => product._id);
    setSelectedProductIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : [...new Set([...current, ...visibleIds])],
    );
  }

  async function archiveSelectedProducts() {
    const selectedCount = selectedProductIds.length;
    if (
      !selectedCount ||
      !window.confirm(`Ẩn ${selectedCount} sản phẩm đã chọn khỏi cửa hàng?`)
    ) {
      return;
    }

    setDeletingSelected(true);
    setLoadError("");
    try {
      const result = await requestJson({
        reqPATH: "/admin/products/bulk",
        method: "DELETE",
        data: { ids: selectedProductIds },
      });
      const selectedIds = new Set(selectedProductIds);
      setProducts((current) =>
        current.map((product) =>
          selectedIds.has(product._id)
            ? { ...product, deleted: true, status: "inactive" }
            : product,
        ),
      );
      setSelectedProductIds([]);
      setNotice(`Đã chuyển ${result.deletedCount} sản phẩm vào mục tạm ẩn.`);
      window.setTimeout(() => setNotice(""), 3000);
    } catch (error) {
      setLoadError(error.message || "Không thể ẩn các sản phẩm đã chọn.");
    } finally {
      setDeletingSelected(false);
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link aria-label="NovaMark Admin" className="admin-brand" to="/">
          <span className="admin-brand-mark">N</span>
          <span>
            <strong>NovaMark</strong>
            <small>ADMIN CONSOLE</small>
          </span>
        </Link>
        <p className="admin-nav-label">QUẢN LÝ</p>
        <nav aria-label="Điều hướng quản trị" className="admin-nav">
          <a className="admin-nav-item" href="#overview">
            <span aria-hidden="true">▦</span> Tổng quan
          </a>
          <a
            aria-current="page"
            className="admin-nav-item is-current"
            href="#products"
          >
            <span aria-hidden="true">◇</span> Sản phẩm
          </a>
        </nav>
        <div className="admin-sidebar-bottom">
          <a className="admin-back-link" href={STORE_URL}>
            <span aria-hidden="true">←</span> Về cửa hàng
          </a>
          <div className="admin-profile">
            <span className="admin-avatar">A</span>
            <span>
              <strong>Quản trị viên</strong>
              <small>Quản lý cửa hàng</small>
            </span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">
            <span>Quản lý</span>
            <span aria-hidden="true">/</span>
            <strong>Sản phẩm</strong>
          </div>
          <span className="admin-topbar-status">
            <span aria-hidden="true" /> Hệ thống đang hoạt động
          </span>
          <button className="admin-logout" onClick={onLogout} type="button">
            Đăng xuất
          </button>
        </header>

        <div className="admin-content" id="overview">
          <section className="admin-page-heading" id="products">
            <div>
              <p className="admin-eyebrow">CỬA HÀNG CỦA BẠN</p>
              <h1>Quản lý sản phẩm</h1>
              <p>
                Theo dõi, cập nhật và quản lý danh mục sản phẩm của cửa hàng.
              </p>
            </div>
            <button
              className="admin-button admin-button-primary"
              onClick={() => {
                setDialogProduct(null);
                setDialogOpen(true);
              }}
              type="button"
            >
              <span aria-hidden="true">＋</span> Thêm sản phẩm
            </button>
          </section>

          {notice && (
            <div className="admin-notice" role="status">
              <span aria-hidden="true">✓</span> {notice}
            </div>
          )}
          {loadError && (
            <div className="admin-alert" role="alert">
              <span>{loadError}</span>
              {loadError.includes("đăng nhập") && (
                <Link to="/login">Đăng nhập</Link>
              )}
              {loadError.includes("quyền quản trị") && (
                <span> Hãy đăng nhập bằng tài khoản quản trị.</span>
              )}
              <button onClick={loadProducts} type="button">
                Thử lại
              </button>
            </div>
          )}

          <section aria-label="Thống kê sản phẩm" className="admin-stat-grid">
            <article className="admin-stat-card">
              <span className="admin-stat-icon admin-stat-icon-violet">◇</span>
              <div>
                <p>Tổng sản phẩm</p>
                <strong>{loading ? "—" : products.length}</strong>
                <small>Trong danh mục cửa hàng</small>
              </div>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon admin-stat-icon-green">↗</span>
              <div>
                <p>Đang kinh doanh</p>
                <strong>{loading ? "—" : activeCount}</strong>
                <small>Sản phẩm đang hiển thị</small>
              </div>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon admin-stat-icon-orange">◷</span>
              <div>
                <p>Đang tạm ẩn</p>
                <strong>{loading ? "—" : inactiveCount}</strong>
                <small>Chưa hiển thị với khách hàng</small>
              </div>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon admin-stat-icon-blue">％</span>
              <div>
                <p>Đang giảm giá</p>
                <strong>{loading ? "—" : discountedCount}</strong>
                <small>Có chương trình ưu đãi</small>
              </div>
            </article>
          </section>

          <section
            aria-labelledby="admin-products-title"
            className="admin-products-panel"
          >
            <div className="admin-panel-heading">
              <div>
                <h2 id="admin-products-title">Danh sách sản phẩm</h2>
                <p>{visibleProducts.length} sản phẩm phù hợp</p>
              </div>
              <button
                aria-label="Tải lại danh sách"
                className="admin-refresh-button"
                disabled={loading}
                onClick={loadProducts}
                type="button"
              >
                <span aria-hidden="true">↻</span> Làm mới
              </button>
            </div>
            <div className="admin-product-toolbar">
              <label className="admin-search">
                <span aria-hidden="true">⌕</span>
                <input
                  aria-label="Tìm sản phẩm"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm theo tên, thương hiệu, danh mục..."
                  type="search"
                  value={search}
                />
              </label>
              <div
                aria-label="Lọc trạng thái sản phẩm"
                className="admin-filter-tabs"
              >
                {[
                  ["all", "Tất cả"],
                  ["active", "Đang bán"],
                  ["inactive", "Tạm ẩn"],
                ].map(([value, label]) => (
                  <button
                    aria-pressed={statusFilter === value}
                    className={statusFilter === value ? "is-selected" : ""}
                    key={value}
                    onClick={() => setStatusFilter(value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {selectedProductIds.length > 0 && (
              <div className="admin-selection-toolbar">
                <span>Đã chọn {selectedProductIds.length} sản phẩm</span>
                <button
                  className="admin-button admin-button-danger"
                  disabled={deletingSelected}
                  onClick={archiveSelectedProducts}
                  type="button"
                >
                  {deletingSelected ? "Đang ẩn..." : "Ẩn sản phẩm đã chọn"}
                </button>
              </div>
            )}

            <div className="admin-table-scroll">
              <table className="admin-product-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        aria-label={
                          allVisibleSelected
                            ? "Bỏ chọn tất cả sản phẩm đang hiển thị"
                            : "Chọn tất cả sản phẩm đang hiển thị"
                        }
                        checked={allVisibleSelected}
                        className="admin-product-select"
                        onChange={toggleVisibleProducts}
                        type="checkbox"
                      />
                    </th>
                    <th scope="col">SẢN PHẨM</th>
                    <th scope="col">DANH MỤC</th>
                    <th scope="col">GIÁ BÁN</th>
                    <th scope="col">ĐÁNH GIÁ</th>
                    <th scope="col">TRẠNG THÁI</th>
                    <th scope="col">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="admin-table-message" colSpan="7">
                        Đang tải sản phẩm...
                      </td>
                    </tr>
                  ) : visibleProducts.length ? (
                    visibleProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <input
                            aria-label={`Chọn ${product.title || "sản phẩm"}`}
                            checked={selectedProductIds.includes(product._id)}
                            className="admin-product-select"
                            disabled={product.deleted}
                            onChange={() =>
                              setSelectedProductIds((current) =>
                                current.includes(product._id)
                                  ? current.filter((id) => id !== product._id)
                                  : [...current, product._id],
                              )
                            }
                            type="checkbox"
                          />
                        </td>
                        <td>
                          <div className="admin-product-cell">
                            <img
                              alt=""
                              className="admin-product-thumb"
                              onError={(event) => {
                                event.currentTarget.style.visibility = "hidden";
                              }}
                              src={product.images?.[0] || ""}
                            />
                            <div>
                              <strong>{product.title || "Chưa đặt tên"}</strong>
                              <span>
                                {product.brand || "Chưa có thương hiệu"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{product.category || "Chưa phân loại"}</td>
                        <td>
                          <strong className="admin-price">
                            {formatUsdAsVnd(product.price)}
                          </strong>
                          {Number(product.discountPercentage) > 0 && (
                            <span className="admin-discount">
                              -{product.discountPercentage}%
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="admin-rating">
                            <span aria-hidden="true">★</span>{" "}
                            {Number(product.rating || 0).toFixed(1)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`admin-status ${
                              isInactiveProduct(product)
                                ? "is-inactive"
                                : "is-active"
                            }`}
                          >
                            <span />
                            {isInactiveProduct(product)
                              ? "Dừng bán"
                              : "Đang bán"}
                          </span>
                        </td>
                        <td>
                          <div className="admin-row-actions">
                            <button
                              aria-label={`Sửa ${product.title}`}
                              className="admin-row-action"
                              onClick={() => {
                                setDialogProduct(product);
                                setDialogOpen(true);
                              }}
                              title="Chỉnh sửa"
                              type="button"
                            >
                              ✎
                            </button>
                            {isInactiveProduct(product) ? (
                              <button
                                aria-label={`Mở bán lại ${product.title}`}
                                className="admin-row-action"
                                disabled={relistingProductId === product._id}
                                onClick={() => relistProduct(product)}
                                title="Mở bán lại"
                                type="button"
                              >
                                {relistingProductId === product._id ? "…" : "↗"}
                              </button>
                            ) : (
                              <button
                                aria-label={`Ẩn ${product.title}`}
                                className="admin-row-action is-danger"
                                onClick={() => archiveProduct(product)}
                                title="Ẩn sản phẩm"
                                type="button"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="admin-table-message" colSpan="7">
                        {search
                          ? "Không tìm thấy sản phẩm phù hợp."
                          : "Chưa có sản phẩm nào trong danh mục."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          <footer className="admin-footer">
            <span>NovaMark Admin</span>
            <span>Quản lý sản phẩm cửa hàng</span>
          </footer>
        </div>
      </main>

      {dialogOpen && (
        <ProductDialog
          onClose={() => {
            setDialogOpen(false);
            setDialogProduct(null);
          }}
          onSave={saveProduct}
          product={dialogProduct}
          saving={saving}
        />
      )}
    </div>
  );
}
