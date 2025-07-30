from db import db


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.String(64), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    icon = db.Column(db.String(255))
    price = db.Column(db.Numeric(10, 2))
    oldPrice = db.Column(db.Numeric(10, 2))
    offerId = db.Column(db.String(64))
    ratio = db.Column(db.String(50))
    sectionSlug = db.Column(db.String(100))
    companyId = db.Column(db.String(64))
    branchId = db.Column(db.String(64))
    deliveryType = db.Column(db.String(50))
    externalProductId = db.Column(db.Integer)
    promotions = db.Column(db.Text)
    specialPrices = db.Column(db.Text)
    createdAt = db.Column(db.DateTime)
    slug = db.Column(db.String(255))
    addToBasketStep = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    displayPrice = db.Column(db.Numeric(10, 2))
    displayOldPrice = db.Column(db.Numeric(10, 2))
    displayRatio = db.Column(db.String(50))
    guestProductRating = db.Column(db.Numeric(3, 1))
    guestProductRatingCount = db.Column(db.Integer)
    classifierSapId = db.Column(db.String(64))
    originType = db.Column(db.String(50))
    brandId = db.Column(db.String(64))
    brandTitle = db.Column(db.String(100))
    weighted = db.Column(db.Boolean)
    blurForUnderAged = db.Column(db.Boolean)
    modifier = db.Column(db.Text)
    added_at = db.Column(db.DateTime)
    discount = db.Column(db.Float)

    def __init__(self, **kwargs):
        for field in kwargs:
            setattr(self, field, kwargs[field])

    def to_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }
