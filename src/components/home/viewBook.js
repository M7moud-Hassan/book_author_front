import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../css/book_view.css'
import { connect } from "react-redux";
import * as actions from '../../actions/index'

function ViewBook(props) {
    const { id } = useParams()
    const userData = JSON.parse(localStorage.getItem('userData'));
    const styles = [];

    useEffect(() => {

        if (userData) {
            props.isTokenTxpired({ "token": userData.access_token });
        } else {
            window.location = '/'
        }
        props.getDetailsBookView(id, userData.access_token)


    }, []);

    if (props.book.pages) {
        for (let i = 1; i <= props.book.pages.length; i++) {
            const style = `
          .container-book #p${i} {
            z-index: ${(props.book.pages.length + 1) - i};
          }
          .container-book #c${i}:checked ~ .flip-book #p${i} {
            transform: rotateY(-180deg);
            z-index: ${i};
          }
          .container-book #c${i + 2}:checked ~ .flip-book #p${i} {
              display: none;
              }
        `;
            styles.push(style);
        }
    }

    const generatedStyles = styles.join('\n');
    return <>
        <style>{generatedStyles}</style>
        <section id="mu-hero">
            <div className="container">
                <div className="row">

                    <>
                        <div className="col-md-6 col-sm-6 col-sm-push-6">
                            <div className="mu-hero-right">
                                <img src={`http://localhost:8000${props.book ? props.book.image : ''}`} className="imageRigth" alt="Ebook img" />
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-6 col-sm-pull-6">
                            <div className="mu-hero-left">
                                {props.book.author ? (<>
                                    <h1><span className="suptitle">author :</span> {props.book.author.username}</h1>
                                    <h1> <span className="suptitle">title :</span> {props.book.title}</h1>
                                    <h1> <span className="suptitle"> number pages : </span>{props.book.pages.length}</h1>
                                </>) : <></>}

                            </div>
                        </div></>

                </div>
            </div>
        </section>
        <main role="main">
            <section id="mu-counter">
                <div className="container-book">
                    {props.book.pages ? <div className="book">
                        {props.book.pages.map((ele, index) => {
                            return <input type="checkbox" id={`c${index + 1}`} />
                        })}

                        <div id="cover"></div>
                        <div className="flip-book">

                            {props.book.pages.map((ele, index) => {
                                if (index == 0 && props.book.pages.length == 1) {

                                    return <>
                                        <div className="flip" id="p1">
                                            <div className="back">

                                                <div className="pages-style" dangerouslySetInnerHTML={{ __html: ele.content }}></div>
                                                <label className="back-btn" for="c1">Back</label>
                                            </div>
                                            <div className="pageS front" style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    background: '#005f73',
                                                    color: 'white'
                                                }}>
                                                <img src={`http://localhost:8000${props.book.image}`} alt="Chessboard white" />
                                                <h1 className="titlebook">{props.book.title}</h1>
                                                <label className="next-btn" for="c1" style={{
                                                    color: 'white',
                                                    border: '1px solid white'
                                                }}>Open</label>
                                            </div>
                                        </div>
                                        <div className="flip" id={`p2`}>
                                            <div className="front" style={{
                                                color: 'white',
                                                background: '#005f73'
                                            }}
                                            >
                                                End of the book

                                            </div>

                                        </div>
                                    </>
                                } else
                                    if (index == 0) {

                                        return <>
                                            <div className="flip" id="p1">
                                                <div className="back">

                                                    <div className="pages-style" dangerouslySetInnerHTML={{ __html: ele.content }}></div>
                                                    <label className="back-btn" for="c1">Back</label>
                                                </div>
                                                <div className="front" style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    background: '#005f73',
                                                    color: 'white'
                                                }}>
                                                    <img src={`http://localhost:8000${props.book.image}`} alt="Chessboard white" />
                                                    <h1 className="titlebook">{props.book.title}</h1>
                                                    <label className="next-btn" for="c1" style={{
                                                        color: 'white',
                                                        border: '1px solid white'
                                                    }}>Open</label>
                                                </div>
                                            </div>
                                        </>
                                    } else if (index % 2 != 0 && index != props.book.pages.length - 1) {
                                        return <>
                                            <div className="flip" id={`p${Math.ceil((ele.number + 1) / 2)}`}>
                                                <div className="back">
                                                    <div className="pages-style" dangerouslySetInnerHTML={{ __html: props.book.pages[index + 1].content }}></div>

                                                    <label className="back-btn" for={`c${Math.ceil((ele.number + 1) / 2)}`}>Back</label>
                                                </div>
                                                <div className="front">
                                                    <div className="pages-style" dangerouslySetInnerHTML={{ __html: ele.content }}></div>

                                                    <label className="next-btn" for={`c${Math.ceil((ele.number + 1) / 2)}`}>Next</label>
                                                </div>
                                            </div>
                                        </>
                                    }
                                if (index == props.book.pages.length - 1 && index % 2 != 0) {

                                    return <>
                                        <div className="flip" id={`p${(props.book.pages.length + 2) / 2}`}>
                                            <div className="back" style={{
                                                color: 'white',
                                                background: '#005f73',

                                            }}
                                            >
                                                End of the book
                                                <label className="back-btn" for={`c${(props.book.pages.length + 2) / 2}`} style={{
                                                    color: 'white',
                                                    border: '1px solid white'
                                                }}
                                                >Back</label>
                                            </div>
                                            <div className="front" style={{
                                                height: '100%',
                                                width: '100%'
                                            }}
                                            >
                                                <div className="pages-style" dangerouslySetInnerHTML={{ __html: ele.content }}></div>
                                                <label className="next-btn" for={`c${(props.book.pages.length + 2) / 2}`}>Next</label>
                                            </div>
                                        </div>
                                    </>
                                } else if (index == props.book.pages.length - 1 && index % 2 == 0) {
                                    return <>
                                        <div className="flip" id={`p${(props.book.pages.length + 2) / 2}`}>
                                            <div className="front" style={{
                                                color: 'white',
                                                background: '#005f73'
                                            }}
                                            >
                                                End of the book

                                            </div>

                                        </div>
                                    </>
                                }
                            })}
                        </div>
                    </div> : <></>}
                </div>
            </section>
        </main>
    </>
}
let mapStateToProps = (state) => {
    return {
        book: state.book,
    };
};

export default connect(mapStateToProps, actions)(ViewBook);