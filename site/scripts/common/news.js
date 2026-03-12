/**
 * トップページNews記事管理
 */
class NewsController{
    /* コンストラクタ */
    constructor(){
        this.data = {
            element : {
                news : document.querySelector('#container .a_news .m_newsList.s_home')
            }
        };
    }
    /* 初期化 */
    init(){
        this.data.element.news.innerHTML = '';
        this.loadPickupNews();
        this.loadNews();
    }
    /* ピックアップお知らせ表示 */
    loadPickupNews(){
        this.fetch('/news/?mode=pickup',this.data.element.news,true);
    }
    /* お知らせ表示 */
    loadNews(){
        this.fetch('/news/?mode=top',this.data.element.news,false);
    }
    /* Ajax処理 */
    fetch(url,elm,afterbegin){
        const options = {
            method  : 'GET',
            headers : {
                'Content-Type': 'text/html'
            }
        };
        fetch(url,options)
            .then((response)=>{
                if (!response.ok) {
                    throw new Error();
                }
                return response.text();
            })
            .then((html)=>{
                elm.insertAdjacentHTML(afterbegin ? 'afterbegin' : 'beforeend',html);
            })
            .catch((error)=>{
                console.log(error);
            });
    }
}
window.addEventListener('DOMContentLoaded',()=>{
    const nc = new NewsController();
    nc.init();
});