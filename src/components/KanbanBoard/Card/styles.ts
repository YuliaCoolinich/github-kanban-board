import COLORS from "../../constants/colors";

const styles = {
    container: {
        borderRadius: 10,
        border: `1px solid ${COLORS.lightGray}`,
        background: COLORS.ghostWhite,
        padding: 5,
        margin: 10,
        overflow: 'hidden',
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
        margin: 10,
    },
    date: {
        color: COLORS.gray,
        textAlign: "left",
        margin: 7,
    },
    discription: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        color: COLORS.gray,
        margin: 7,
    },
    dataColumnsWrapper: {
        padding: 0,
        margin: 0,
        textAlign: 'left',
    },
    dataColumns: {
        width: 'fit-content',
        padding: 0,
        margin: 0,
        marginRight: 10,
    }
};

export default styles;