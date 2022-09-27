import COLORS from "../../constants/colors";

const styles = {
    wrapper: {
        height: 'auto',
        width: '100%',
    },
    container: {
        width: 300,
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "stretch"
    },
    cardSegmentDropped: {
        width: '100%',
        height: '100%',
        background: COLORS.whiteSmoke,
        overflow: 'overlay',
        padding: 10,
    },
    cardSegment: {
        width: '100%',
        height: '100%',
        background: COLORS.lightGray,
        overflow: 'overlay',
        padding: 10,
    },
    infoContent: {
        color: COLORS.ghostWhite,
    }
}

export default styles;