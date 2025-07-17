CREATE DB

```
CREATE TABLE items (
    id CHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    price DECIMAL(10,2),
    oldPrice DECIMAL(10,2),
    offerId CHAR(64),
    ratio VARCHAR(50),
    sectionSlug VARCHAR(100),
    companyId CHAR(64),
    branchId CHAR(64),
    deliveryType VARCHAR(50),
    externalProductId INT,
    promotions JSON,
    specialPrices JSON,
    createdAt DATETIME,
    slug VARCHAR(255),
    addToBasketStep INT,
    stock INT,
    displayPrice DECIMAL(10,2),
    displayOldPrice DECIMAL(10,2),
    displayRatio VARCHAR(50),
    guestProductRating DECIMAL(3,1),
    guestProductRatingCount INT,
    classifierSapId CHAR(64),
    originType VARCHAR(50),
    brandId CHAR(64),
    brandTitle VARCHAR(100),
    weighted BOOLEAN,
    blurForUnderAged BOOLEAN,
    modifier VARCHAR(100)
);
```

ADD DB USER
```
CREATE USER 'alex'@'localhost' IDENTIFIED BY 'myusualworkpassword';
GRANT ALL PRIVILEGES ON panel.* TO 'alex'@'localhost';
FLUSH PRIVILEGES;
```