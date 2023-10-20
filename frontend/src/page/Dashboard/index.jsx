import React from 'react';
import HeaderLogin from "../../components/HeaderLogin";
import './style.scss'

export default function Dashboard() {

    return (
        <>
            <HeaderLogin />
            <main id='dashboard'>
                <section className="questions">
                    <div className='questions-today'>
                        <h2>Today's questions</h2>
                        <hr></hr>

                        <div className='today-container'>
                        <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>história</span>
                                </div>
                            </div>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>história</span>
                                </div>
                            </div>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>matemática</span>
                                </div>
                            </div>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>geografia</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='questions-today'>
                        <h2>Today's questions</h2>
                        <hr></hr>

                        <div className='today-container'>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>história</span>
                                </div>
                            </div>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>matemática</span>
                                </div>
                            </div>
                            <div className="item">
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed non sint provident minus cumque totam laboriosam voluptas excepturi quas maiores ab, accusamus ipsum labore beatae ad. Molestias earum cumque obcaecati.
                                </p>
                                <div className='tags'>
                                    <span>história</span>
                                    <span>história</span>
                                    <span>geografia</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="dois"></section>
            </main>
        </>
    )
}