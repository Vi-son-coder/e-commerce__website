/*
============================================================
E-COMMERCE DATABASE - SQL SERVER
Based on the provided ERD
Compatible with Microsoft SQL Server / SSMS
============================================================
*/

-- ============================================================
-- 1. CREATE DATABASE
-- ============================================================

USE master;
GO

IF DB_ID(N'ecommerce_db') IS NOT NULL
BEGIN
    ALTER DATABASE ecommerce_db
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

    DROP DATABASE ecommerce_db;
END;
GO

CREATE DATABASE ecommerce_db;
GO

USE ecommerce_db;
GO


-- ============================================================
-- 2. AI_MODEL
-- ============================================================

CREATE TABLE AI_MODEL (
    model_id INT IDENTITY(1,1) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    version INT NOT NULL,
    algorithm VARCHAR(100) NOT NULL,
    trained_date DATETIME2 NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'active',

    CONSTRAINT PK_AI_MODEL
        PRIMARY KEY (model_id),

    CONSTRAINT CK_AI_MODEL_VERSION
        CHECK (version > 0)
);
GO


-- ============================================================
-- 3. DANHMUC
-- ============================================================

CREATE TABLE DANHMUC (
    category_id INT IDENTITY(1,1) NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,

    CONSTRAINT PK_DANHMUC
        PRIMARY KEY (category_id),

    CONSTRAINT UQ_DANHMUC_NAME
        UNIQUE (category_name)
);
GO


-- ============================================================
-- 4. KHACHHANG
-- ============================================================

CREATE TABLE KHACHHANG (
    user_id INT IDENTITY(1,1) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    address VARCHAR(255) NULL,

    CONSTRAINT PK_KHACHHANG
        PRIMARY KEY (user_id),

    CONSTRAINT UQ_KHACHHANG_USERNAME
        UNIQUE (username),

    CONSTRAINT UQ_KHACHHANG_EMAIL
        UNIQUE (email)
);
GO


-- ============================================================
-- 5. SANPHAM
-- ============================================================

CREATE TABLE SANPHAM (
    product_id INT IDENTITY(1,1) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    price DECIMAL(12,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    image VARCHAR(255) NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'active',
    category_id INT NOT NULL,

    CONSTRAINT PK_SANPHAM
        PRIMARY KEY (product_id),

    CONSTRAINT FK_SANPHAM_DANHMUC
        FOREIGN KEY (category_id)
        REFERENCES DANHMUC(category_id),

    CONSTRAINT CK_SANPHAM_PRICE
        CHECK (price >= 0),

    CONSTRAINT CK_SANPHAM_QUANTITY
        CHECK (quantity >= 0)
);
GO

CREATE INDEX IX_SANPHAM_CATEGORY
ON SANPHAM(category_id);
GO


-- ============================================================
-- 6. USER_BEHAVIER
-- ============================================================

CREATE TABLE USER_BEHAVIER (
    behavior_id INT IDENTITY(1,1) NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    behavior_type VARCHAR(255) NOT NULL,
    behavior_time DATETIME2 NOT NULL DEFAULT GETDATE(),
    duration INT NULL,

    CONSTRAINT PK_USER_BEHAVIER
        PRIMARY KEY (behavior_id),

    CONSTRAINT FK_BEHAVIOR_USER
        FOREIGN KEY (user_id)
        REFERENCES KHACHHANG(user_id),

    CONSTRAINT FK_BEHAVIOR_PRODUCT
        FOREIGN KEY (product_id)
        REFERENCES SANPHAM(product_id),

    CONSTRAINT CK_BEHAVIOR_DURATION
        CHECK (duration IS NULL OR duration >= 0)
);
GO

CREATE INDEX IX_BEHAVIOR_USER
ON USER_BEHAVIER(user_id);
GO

CREATE INDEX IX_BEHAVIOR_PRODUCT
ON USER_BEHAVIER(product_id);
GO

CREATE INDEX IX_BEHAVIOR_TIME
ON USER_BEHAVIER(behavior_time);
GO


-- ============================================================
-- 7. DONHANG
-- ============================================================

CREATE TABLE DONHANG (
    order_id INT IDENTITY(1,1) NOT NULL,
    user_id INT NOT NULL,
    order_date DATETIME2 NOT NULL DEFAULT GETDATE(),
    shipping_address VARCHAR(255) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT PK_DONHANG
        PRIMARY KEY (order_id),

    CONSTRAINT FK_DONHANG_KHACHHANG
        FOREIGN KEY (user_id)
        REFERENCES KHACHHANG(user_id),

    CONSTRAINT CK_DONHANG_TOTAL
        CHECK (total_amount >= 0)
);
GO

CREATE INDEX IX_DONHANG_USER
ON DONHANG(user_id);
GO

CREATE INDEX IX_DONHANG_DATE
ON DONHANG(order_date);
GO


-- ============================================================
-- 8. PRODUCT_RECOMMENDATIONS
-- ============================================================

CREATE TABLE PRODUCT_RECOMMENDATIONS (
    recommendation_id INT IDENTITY(1,1) NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    model_id INT NOT NULL,
    score DECIMAL(10,4) NOT NULL,
    recommended_at DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT PK_PRODUCT_RECOMMENDATIONS
        PRIMARY KEY (recommendation_id),

    CONSTRAINT FK_RECOMMENDATION_USER
        FOREIGN KEY (user_id)
        REFERENCES KHACHHANG(user_id),

    CONSTRAINT FK_RECOMMENDATION_PRODUCT
        FOREIGN KEY (product_id)
        REFERENCES SANPHAM(product_id),

    CONSTRAINT FK_RECOMMENDATION_MODEL
        FOREIGN KEY (model_id)
        REFERENCES AI_MODEL(model_id),

    CONSTRAINT CK_RECOMMENDATION_SCORE
        CHECK (score >= 0)
);
GO

CREATE INDEX IX_RECOMMENDATION_USER
ON PRODUCT_RECOMMENDATIONS(user_id);
GO

CREATE INDEX IX_RECOMMENDATION_PRODUCT
ON PRODUCT_RECOMMENDATIONS(product_id);
GO

CREATE INDEX IX_RECOMMENDATION_MODEL
ON PRODUCT_RECOMMENDATIONS(model_id);
GO


-- ============================================================
-- 9. DATA_TRAINING
-- ============================================================

CREATE TABLE DATA_TRAINING (
    training_id INT IDENTITY(1,1) NOT NULL,
    model_id INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    behavior_id INT NOT NULL,
    create_date DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT PK_DATA_TRAINING
        PRIMARY KEY (training_id),

    CONSTRAINT FK_TRAINING_MODEL
        FOREIGN KEY (model_id)
        REFERENCES AI_MODEL(model_id),

    CONSTRAINT FK_TRAINING_USER
        FOREIGN KEY (user_id)
        REFERENCES KHACHHANG(user_id),

    CONSTRAINT FK_TRAINING_PRODUCT
        FOREIGN KEY (product_id)
        REFERENCES SANPHAM(product_id),

    CONSTRAINT FK_TRAINING_BEHAVIOR
        FOREIGN KEY (behavior_id)
        REFERENCES USER_BEHAVIER(behavior_id)
);
GO

CREATE INDEX IX_TRAINING_MODEL
ON DATA_TRAINING(model_id);
GO

CREATE INDEX IX_TRAINING_USER
ON DATA_TRAINING(user_id);
GO

CREATE INDEX IX_TRAINING_PRODUCT
ON DATA_TRAINING(product_id);
GO

CREATE INDEX IX_TRAINING_BEHAVIOR
ON DATA_TRAINING(behavior_id);
GO


-- ============================================================
-- 10. CHITIETDONHANG
-- ============================================================

CREATE TABLE CHITIETDONHANG (
    order_detail_id INT IDENTITY(1,1) NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,

    CONSTRAINT PK_CHITIETDONHANG
        PRIMARY KEY (order_detail_id),

    CONSTRAINT FK_CHITIETDONHANG_DONHANG
        FOREIGN KEY (order_id)
        REFERENCES DONHANG(order_id),

    CONSTRAINT FK_CHITIETDONHANG_SANPHAM
        FOREIGN KEY (product_id)
        REFERENCES SANPHAM(product_id),

    CONSTRAINT CK_CHITIET_QUANTITY
        CHECK (quantity > 0),

    CONSTRAINT CK_CHITIET_PRICE
        CHECK (price >= 0),

    CONSTRAINT UQ_ORDER_PRODUCT
        UNIQUE (order_id, product_id)
);
GO

CREATE INDEX IX_CHITIET_ORDER
ON CHITIETDONHANG(order_id);
GO

CREATE INDEX IX_CHITIET_PRODUCT
ON CHITIETDONHANG(product_id);
GO


-- ============================================================
-- 11. THANHTOAN
-- ============================================================

CREATE TABLE THANHTOAN (
    payment_id INT IDENTITY(1,1) NOT NULL,
    order_id INT NOT NULL,
    payment_date DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT PK_THANHTOAN
        PRIMARY KEY (payment_id),

    CONSTRAINT FK_THANHTOAN_DONHANG
        FOREIGN KEY (order_id)
        REFERENCES DONHANG(order_id),

    CONSTRAINT UQ_THANHTOAN_ORDER
        UNIQUE (order_id)
);
GO


-- ============================================================
-- 12. SAMPLE DATA - AI MODEL
-- ============================================================

INSERT INTO AI_MODEL
    (model_name, version, algorithm, trained_date, status)
VALUES
    ('Product Recommendation Model', 1, 'Collaborative Filtering',
     GETDATE(), 'active'),
    ('Product Recommendation Model', 2, 'Content Based Filtering',
     GETDATE(), 'active');
GO


-- ============================================================
-- 13. SAMPLE DATA - CATEGORY
-- ============================================================

INSERT INTO DANHMUC
    (category_name, description)
VALUES
    ('Dien thoai', 'Dien thoai thong minh'),
    ('Laptop', 'May tinh xach tay'),
    ('Tai nghe', 'Tai nghe va thiet bi am thanh');
GO


-- ============================================================
-- 14. SAMPLE DATA - CUSTOMER
-- ============================================================

INSERT INTO KHACHHANG
    (username, password, email, full_name, phone, address)
VALUES
    ('admin', 'DEMO_HASH_ADMIN', 'admin@example.com',
     'Administrator', '0900000001', 'Ha Noi'),
    ('son', 'DEMO_HASH_SON', 'son@example.com',
     'Cao Thanh Son', '0900000002', 'Ha Noi'),
    ('nguyenan', 'DEMO_HASH_AN', 'an@example.com',
     'Nguyen An', '0900000003', 'Ha Noi');
GO


-- ============================================================
-- 15. SAMPLE DATA - PRODUCT
-- ============================================================

INSERT INTO SANPHAM
    (product_name, description, price, quantity, image, status, category_id)
VALUES
    ('iPhone 17', 'Apple smartphone', 25000000, 20,
     'iphone17.jpg', 'active', 1),
    ('MacBook Air', 'Apple laptop', 28000000, 15,
     'macbook-air.jpg', 'active', 2),
    ('Galaxy S26', 'Samsung smartphone', 22000000, 30,
     'galaxy-s26.jpg', 'active', 1),
    ('Sony Headphones', 'Wireless headphones', 4500000, 25,
     'sony-headphone.jpg', 'active', 3);
GO


-- ============================================================
-- 16. SAMPLE DATA - USER BEHAVIOR
-- ============================================================

INSERT INTO USER_BEHAVIER
    (user_id, product_id, behavior_type, behavior_time, duration)
VALUES
    (2, 1, 'view', GETDATE(), 35),
    (2, 1, 'click', GETDATE(), 10),
    (2, 3, 'view', GETDATE(), 50),
    (3, 2, 'view', GETDATE(), 80),
    (3, 4, 'view', GETDATE(), 40);
GO


-- ============================================================
-- 17. SAMPLE DATA - ORDERS
-- ============================================================

INSERT INTO DONHANG
    (user_id, order_date, shipping_address, total_amount)
VALUES
    (2, GETDATE(), 'Ha Noi, Vietnam', 25000000),
    (3, GETDATE(), 'Ha Noi, Vietnam', 32500000);
GO


-- ============================================================
-- 18. SAMPLE DATA - ORDER DETAILS
-- ============================================================

INSERT INTO CHITIETDONHANG
    (order_id, product_id, quantity, price)
VALUES
    (1, 1, 1, 25000000),
    (2, 2, 1, 28000000),
    (2, 4, 1, 4500000);
GO


-- ============================================================
-- 19. SAMPLE DATA - PAYMENTS
-- ============================================================

INSERT INTO THANHTOAN
    (order_id, payment_date)
VALUES
    (1, GETDATE()),
    (2, GETDATE());
GO


-- ============================================================
-- 20. SAMPLE DATA - RECOMMENDATIONS
-- ============================================================

INSERT INTO PRODUCT_RECOMMENDATIONS
    (user_id, product_id, model_id, score, recommended_at)
VALUES
    (2, 3, 1, 0.9234, GETDATE()),
    (2, 4, 1, 0.8542, GETDATE()),
    (3, 1, 2, 0.9121, GETDATE());
GO


-- ============================================================
-- 21. SAMPLE DATA - TRAINING
-- ============================================================

INSERT INTO DATA_TRAINING
    (model_id, user_id, product_id, behavior_id, create_date)
VALUES
    (1, 2, 1, 1, GETDATE()),
    (1, 2, 1, 2, GETDATE()),
    (1, 2, 3, 3, GETDATE()),
    (2, 3, 2, 4, GETDATE()),
    (2, 3, 4, 5, GETDATE());
GO


-- ============================================================
-- 22. CHECK TABLES
-- ============================================================

SELECT
    TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO


-- ============================================================
-- 23. CHECK DATA
-- ============================================================

SELECT * FROM AI_MODEL;
SELECT * FROM DANHMUC;
SELECT * FROM KHACHHANG;
SELECT * FROM SANPHAM;
SELECT * FROM USER_BEHAVIER;
SELECT * FROM DONHANG;
SELECT * FROM PRODUCT_RECOMMENDATIONS;
SELECT * FROM DATA_TRAINING;
SELECT * FROM CHITIETDONHANG;
SELECT * FROM THANHTOAN;
GO


-- ============================================================
-- 24. TEST RELATIONSHIPS
-- ============================================================

-- Product + Category
SELECT
    sp.product_id,
    sp.product_name,
    sp.price,
    sp.quantity,
    dm.category_name
FROM SANPHAM sp
INNER JOIN DANHMUC dm
    ON sp.category_id = dm.category_id;
GO


-- User behavior + Customer + Product
SELECT
    kh.username,
    sp.product_name,
    ub.behavior_type,
    ub.behavior_time,
    ub.duration
FROM USER_BEHAVIER ub
INNER JOIN KHACHHANG kh
    ON ub.user_id = kh.user_id
INNER JOIN SANPHAM sp
    ON ub.product_id = sp.product_id;
GO


-- Order + Customer
SELECT
    dh.order_id,
    kh.username,
    dh.order_date,
    dh.shipping_address,
    dh.total_amount
FROM DONHANG dh
INNER JOIN KHACHHANG kh
    ON dh.user_id = kh.user_id;
GO


-- Order details
SELECT
    dh.order_id,
    kh.username,
    sp.product_name,
    ct.quantity,
    ct.price,
    ct.quantity * ct.price AS subtotal
FROM CHITIETDONHANG ct
INNER JOIN DONHANG dh
    ON ct.order_id = dh.order_id
INNER JOIN KHACHHANG kh
    ON dh.user_id = kh.user_id
INNER JOIN SANPHAM sp
    ON ct.product_id = sp.product_id;
GO


-- Recommendations
SELECT
    kh.username,
    sp.product_name,
    ai.model_name,
    ai.algorithm,
    pr.score,
    pr.recommended_at
FROM PRODUCT_RECOMMENDATIONS pr
INNER JOIN KHACHHANG kh
    ON pr.user_id = kh.user_id
INNER JOIN SANPHAM sp
    ON pr.product_id = sp.product_id
INNER JOIN AI_MODEL ai
    ON pr.model_id = ai.model_id
ORDER BY pr.score DESC;
GO
