import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailRequest } from "../../redux/slicers/product.slice";

function BookPage() {
    let location = useLocation()

    const dispatch = useDispatch()
    // const { productDetail } = useSelector((state) => state.product)

    // const [dataBook, setDataBook] = useState('')

    let params = new URLSearchParams(location.search);
    const id = params.get("id"); // book id

    useEffect(() => {
        fetchBook(id)
    }, [id])

    const fetchBook = (id) => {
        dispatch(getProductDetailRequest({ id: id }))
    }

    

    return ( 
        <>
            <ViewDetail  />
        </>
    );
}

export default BookPage;