import { useState } from "react"
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../actions/forecast";
import { foreCastpropsInterface } from "../types/forecast"
const Search = (props: foreCastpropsInterface) => {

    const [search, setSearch] = useState<string | number>("")
    const [selectSearchByCategory, setSelectSearchByCategory] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleSearchEvent = (searchValue: string | number) => {
        setSearch(searchValue)
    }

    const handleSearchByCategory = (searchType: string) => {
        setSelectSearchByCategory(searchType)
    }
    // method to handle error
    const handleError = (error: string) => {
        setError(error)
        setTimeout(() => {
            setError("")
        }, 3000)
    }
    const getSearchResult = () => {
        if (!selectSearchByCategory) {
            handleError("Please select search type")
        }
        else if (!search) {
            handleError("Please fill search box")
        }
        else {
            props.getForecastData(selectSearchByCategory, search)
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="input-group mb-3 searchDropDown">
                        <div className="input-group-prepend">
                            <select className="form-control select2bs4" style={{ width: 150 }} onChange={(e) => handleSearchByCategory(e.target.value)}>
                                <option value="">Search by</option>
                                <option value="cityName">City Name</option>
                                <option value="cityId">City Id</option>
                                <option value="zipCode">Zip Code</option>
                            </select>
                        </div>
                        <input type="text" value={search} className="form-control" placeholder="Search term.." aria-label="search" aria-describedby="basic-addon2" onChange={(e) =>
                            handleSearchEvent(e.target.value)
                        } />
                        <div className="input-group-append appendBtn" onClick={() => getSearchResult()}>
                            <span className="input-group-text" id="basic-addon2"> <i className="bi-search"></i></span>
                        </div>

                    </div>
                    <p className="errorValidaiton">{error}</p>
                </div>
            </div>
        </>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)