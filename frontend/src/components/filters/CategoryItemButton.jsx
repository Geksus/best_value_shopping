export default function CategoryItemButton({ removeFilterFromList, value }) {
    return (
        <button
            className="categoryItemButton"
            onClick={() => removeFilterFromList(value)}
        >
            X
        </button>
    )
}
