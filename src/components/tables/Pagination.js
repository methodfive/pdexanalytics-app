// eslint-disable-next-line no-unused-vars
export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    return (
        <>
            <div className="pagination mt-2 pt-3 pb-0">
                <div className="row text-muted">
                    <div className="col-3 p-0">
                        {activePage !== 1 && <a href="#page" onClick={(e) => setActivePage(e, activePage - 1)}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </a>}
                        {activePage === 1 && <>&nbsp;</>}
                    </div>
                    <div className="col-6 text-center p-0">
                        <p>
                            Page {activePage} of {totalPages}
                        </p>
                    </div>
                    <div className="col-3 text-right p-0">
                        {activePage !== totalPages &&
                            <a disabled={activePage === totalPages} href="#page" onClick={(e) => setActivePage(e, activePage + 1)}>
                                <i className="fa-solid fa-arrow-right"></i>
                        </a>}
                        {activePage === totalPages && <>&nbsp;</>}
                    </div>
                </div>
            </div>
        </>
    )
}