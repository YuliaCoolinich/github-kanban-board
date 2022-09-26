const styles = {
    container: {
        borderRadius: 10,
        border: '1px solid black', //rgba(0, 0, 0, 0.05)
        background: "white",
        padding: 5,
        margin: 10,
    },
    draggableContainer: {
        opacity: 1,
    },
    underDraggableContainer: {
        opacity: 0.5,
    },
    title: {
        fontSize: 20,
        textAlign: "left",
    },
    date: {
        color: "grey",
        textAlign: "left",
    },
    dataLinks: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 6
    }
    
};

export default styles;