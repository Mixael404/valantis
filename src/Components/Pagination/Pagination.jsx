import { useEffect, useState } from "react";
import PostList from "../PostList/PostList";
import { getItems } from "../../api";
import './Pagination.css'
import Preloader from "../Preloader";

// Все айди есть в филтре и пагинации. Нужно вынести подгрузку необходимых данных куда то на этот уровень. Подгружать например 100 постов. Эти 100 постов нарезать по 50 и спускать в постЛист. При переходе на страницу 2 скачиваются посты следующей страницы.

// За обновление массива айдишников отвечает фильтр. При их изменении перемонтируется всё. Стейты очищаются.

// При монтировании получаем 100 постов, далее по 50. Полученные посты аппендим в массив со всеми имеющимеся постами. Пагинация понимает, какие посты нужно взять в зависимости от страницы.

// Как не скачивать посты заново при проходе назад по пагинации?

// Можно рассчитать количество загруженных страниц, исходя из длины массива. Если каррент пейдж равна последней скачанной - подгружать. (Таким образом можно предкачивать любое количество страниц.)

// Получил айди - прокинул их в пагинацию - скачал столько сколько нужно (например, 100) - добавил скчанные посты в стейт айтемов. - Определил длину, исходя из длины рассчитал страницу, на которой нужно подкачать следующие посты, также исходя из страницы - В зависимости от текущей страницы нарезал айтемы в стейт "для показа" - спустил для показа в постЛист

// ТОТАЛ: Стейт всех айди из фильтра, стейт скачанных, стейт для показа


// data - все айди прошедшие фильтр


export default function Pagination({ data }) {
    const [page, setPage] = useState(1)
    const [downloadedPosts, setDownloadedPosts] = useState([])
    const [postsToShow, setPostsToShow] = useState([])

    // Чтобы не отправлять новый запрос в случае, если включил страницу, на которой необходимо подкачать данные, быстро перешёл на другую и обратно, пока посты ещё не подкачались
    const [isLoading, setIsLoading] = useState(false)

    // Чтобы отображать стрелку неработающей и прерывать переход по страницам, пока посты не подгрузились
    const [isLastDownloadedPage, setIsLastDownloadedPage] = useState(true)

    const limit = 50
    const totalNumberOfPosts = data.length
    const amountOfPages = Math.ceil(totalNumberOfPosts / limit)
    const firstPostIndex = (page - 1) * limit

    function handleBack() {
        if (page > 1) {
            setPage((prev) => prev - 1)
        } else {
            console.log("All");
        }
    }

    // TODO: Подумать что сделать с маркером стрелки, если посты ещё не скачались, или убрать совсем (тогда пропадёт стейт downloadedPosts)

    function handleForward() {
        if (page < amountOfPages && !isLastDownloadedPage) {
            setPage((prev) => prev + 1)
        } else {
            console.log("All");
        }
    }

    useEffect(() => {
        const firstPosts = data.slice(0, 100)
        getItems(firstPosts)
            .then((data) => {
                setDownloadedPosts(data)
                setIsLastDownloadedPage(false)
            })
    }, [])


    // Возможно, следует разнести на два эффекта
    useEffect(() => {
        const toShow = downloadedPosts.slice(firstPostIndex, firstPostIndex + limit)
        setPostsToShow(toShow)
        
        // Подкачка постов
        const lastDownloadedPage = Math.ceil(downloadedPosts.length / 50)
        if(page > lastDownloadedPage){
            setIsLastDownloadedPage(true)
        }
        
        if(page === lastDownloadedPage - 1 && page !== (amountOfPages - 1) && !isLoading){  // Включаем подкачку на первой подкачанной странице
            setIsLoading(true)
            console.warn("Need to download more");
            const firstIndex = (page + 1) * limit
            const ids = data.slice(firstIndex, firstIndex + limit * 2 ) // 2 - количество страниц, которое будет подкачано 
            getItems(ids)
                .then((posts) => {
                    setDownloadedPosts((prev) => [...prev, ...posts])
                    setIsLastDownloadedPage(false)
                    setIsLoading(false)
                })
        }
    }, [data, page, firstPostIndex, downloadedPosts])


    return (
        <div className="pagination">
            {
                isLastDownloadedPage ? <Preloader /> : <PostList data={postsToShow} />
            }
            <div className="controls">
                <span
                    className={page === 1 ? 'back disabled' : 'back'}
                    onClick={handleBack}
                >
                    {'<'}
                </span>
                <span
                    className="pageNumber"
                >
                    {page}
                </span>
                <span
                    className={((page === amountOfPages) || isLastDownloadedPage) ? 'forward disabled' : 'forward'}
                    onClick={handleForward}
                >
                    {'>'}
                </span>
            </div>
        </div>
    )
}