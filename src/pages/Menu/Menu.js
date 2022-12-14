import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Checkbox from "../../component/CheckBox/Checkbox";
import CheckboxRadio from "../../component/CheckboxRadio/CheckboxRadio";
import MenuCards from "../../component/MenuCards/MenuCards";
import { employmentType, minBudget } from "./MenuData";
import { fetchAllJobPost } from "../../actions/job-actions";
import { Tag, TagCloseButton, TagLabel, Box, FormControl, FormLabel, HStack, Input } from '@chakra-ui/react';

import {
    fetchJobPosts,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
} from "../../actions/perfume-actions";
import "./MenuStyle.css";

class Menu extends Component {
    state = {
        filterParams: {
            minBudget: 0,
            experienceYear: 999,
            employmentTypes: [],
            cities: [],
            positions: [],
            skills: [],
            others: []
        }
    };

    componentDidMount() {
        this.props.fetchJobPosts();
    }

    getProducts = (variables) => {
        this.props.fetchPerfumesByFilterParams(variables);
    };

    handleNumber = (value) => {
        const data = minBudget;
        let number = 0;

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                number = data[key].value;
            }
        }

        return number;
    };

    handleAddTag = (value, category)=>{
        const newFilters = this.state.filterParams
        if(value){
            newFilters[category].push(value)
        }
        this.setState(newFilters);
    }

    handleDeleteTag = (value, category)=>{
        const newFilters = this.state.filterParams
        const new_arr =  newFilters[category].filter(item => item !== value);
        newFilters[category] = new_arr;
        this.getProducts(newFilters)
        this.setState(newFilters);
    }

    handleFilters = (filters, category) => {
        const newFilters = this.state.filterParams
        newFilters[category] = filters

        if (category === "minBudget") {
            let minSalaryValues = this.handleNumber(filters)
            newFilters[category] = minSalaryValues
        }

        if (category === "experienceYear") {
            let experienceYearValues = parseInt(filters)
            if(experienceYearValues.toString()==="NaN"){
                experienceYearValues = 999;
            }
            newFilters[category] = experienceYearValues
        }


        this.getProducts(newFilters)
        this.setState(newFilters);
    };

    render() {
        const { perfumes } = this.props;

        return (
            <div className="container d-flex" style={{ "width": "100vw" }}>
                <div>
                <nav id="sidebar" style={{ "width": "20vw" }}>
                    <div className="sidebar-header">
                        <h3>Search Job</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <h5>Employment Type</h5>
                        <li className="active mb-2" id="homeSubmenu">
                            <Checkbox list={employmentType}
                                handleFilters={(filters) => this.handleFilters(filters, "employmentTypes")} />
                        </li>
                        <h5>Min Salary</h5>
                        <li className="active mb-2">
                            <CheckboxRadio list={minBudget}
                                handleFilters={(filters) => this.handleFilters(filters, "minBudget")} />
                        </li>
                        <h5>ExperienceYear</h5>
                        <li className="active mb-2">
                            <Input className="input-field" onChange={(filters) => this.handleFilters(filters.target.value, "experienceYear")} />
                        </li>
                    </ul>
                </nav>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='skill'>Add Skills</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "skills")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.skills.length>0 ? this.state.filterParams.skills.map((skill) => (
                            <Tag
                                className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{skill}</TagLabel>
                                {skill ? <TagCloseButton className="delete-tag" onClick={() => this.handleDeleteTag(skill, "skills")} /> : ""}

                            </Tag>
                        )) : (
                            "No Skills Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel  htmlFor='position'>Add Positions</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "positions")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.positions.length>0 ? this.state.filterParams.positions.map((position) => (
                            <Tag
                                className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{position}</TagLabel>
                                {position ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(position, "positions")} /> : ""}

                            </Tag>
                        )) : (
                            "No Positions Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='city'>Th??nh ph???</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "cities")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.cities.length>0 ? this.state.filterParams.cities.map((city) => (
                            <Tag className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{city}</TagLabel>
                                {city ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(city, "cities")} /> : ""}

                            </Tag>
                        )) : (
                            "No Cities Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='others'>Add Others</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "others")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.others.length>0 ? this.state.filterParams.others.map((other) => (
                            <Tag
                            className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{other}</TagLabel>
                                {other ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(other, "others")} /> : ""}

                            </Tag>
                        )) : (
                            "No Others Added"
                        )}
                    </Box>
                </FormControl>
                </div>
                <Route exact component={() => <MenuCards data={perfumes} itemsPerPage={15} searchByData={[]} />} />
            </div>
        );
    }
}

Menu.propTypes = {
    fetchJobPosts: PropTypes.func.isRequired,
    fetchPerfumesByPerfumer: PropTypes.func.isRequired,
    fetchPerfumesByGender: PropTypes.func.isRequired,
    fetchPerfumesByFilterParams: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume.perfumes,
    fetchAllJobPost: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
    fetchJobPosts,
    fetchAllJobPost,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
})(Menu);
