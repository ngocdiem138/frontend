import React from 'react';
import CarouselImageSlider from "../../component/CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../../component/SliderBrands/SliderBrands";
import SliderCards from "../../component/PerfumeCardsSlider/PerfumeCardsSlider";
import { JobPostServiceIml } from '../../actions/user-actions';
import './main.css'
import { useState, useEffect } from 'react';
import HotJobs from "./HotJobs";
import DueSoonJobs from './DueSoonJobs';


const Home = () => {
    const [jobs, setJobs] = React.useState([]);
    const [dueSoonJobs, setDueSoonJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [loadingDueSoon, setLoadingDueSoon] = React.useState(true);
    useEffect(() => {
        JobPostServiceIml.getHotJobPosts().then((response) => {
            if (response.data.data.length != 0) {
                setJobs(response.data.data);
                setLoading(false);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        JobPostServiceIml.getDueSoonJobPosts().then((response) => {
            if (response.data.data.length != 0) {
                setDueSoonJobs(response.data.data);
                setLoadingDueSoon(false);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, [])



    return (
        <div>
            <div className='search-group' style={{ marginLeft: "auto", marginRight: "auto" }}>
                <input className='search-box' placeholder='Nhập công việc bạn cần tìm ...' />
                <button className='search-button'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            {!loading || !loadingDueSoon ? (
                <>
                    <HotJobs jobs={jobs} />
                    <DueSoonJobs jobs={jobs} />
                </>
            ) : (
                <div className="text-center  mt-5">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <h6 className="mt-1">Loading... </h6>
                </div>
            )}
        </div >
    );
}

export default Home;
