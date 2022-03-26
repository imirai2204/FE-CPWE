import { pageActions } from "./table.slice";

export const tableLoad = (data) => {
    return async (dispatch) => {
        dispatch(
            pageActions.updateCurrentPage({
                page: data.page,
                rowsPerPage: data.rowsPerPage,
            }),
        )
    }
}
