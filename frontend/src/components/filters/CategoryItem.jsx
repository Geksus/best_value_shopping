export default function CategoryItem({ name, value, removeFilterFromList }) {
    return (
        <>
            <div className="categoryItem">
                <span>{name}</span>
                <button
                    className="categoryItemButton"
                    onClick={() => removeFilterFromList(value)}
                >
                    X
                </button>
            </div>
        </>
    )
}
