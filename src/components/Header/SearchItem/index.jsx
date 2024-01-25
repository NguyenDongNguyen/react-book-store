import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./SearchItem.scss";
import convertSlug from "../../ConvertSlug";

function BookItem({ data }) {
    const slug = convertSlug(data.mainText);

    return (
        <Link to={`/book/${slug}?id=${data.id}`} className="wrapper_book_item">
            <SearchOutlined className="avatar" />
            <div className="info">
                <h4 className="name">
                    <span>{data.mainText}</span>
                </h4>
                {/* <span className={cx("username")}>{data.nickname}</span> */}
            </div>
        </Link>
    );
}

export default BookItem;
