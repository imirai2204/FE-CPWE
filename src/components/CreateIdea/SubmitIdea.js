import React from "react";
import Modal from "../UI/Modal/Modal";
import { Button } from "../UI/Button/Button";
import { Formik, Form } from "formik";
import { TextField } from "../UI/Form/TextField";
import { SignInSchema } from "../../validation";
import axios from "axios";
import Select from 'react-select';
import { Departments, Topics, Tags, Contributor } from "../Navbar/dropdown/DropdownItems"

function handleSubmit(values) {
    const body = {
        email: values.email,
        password: values.password,
    };

    axios
        .post(`http://localhost:3000/login`, body)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setTimeout(() => {
                alert("Login success");
            }, 400);
        })
        .catch((error) => {
            console.log(error);
            setTimeout(() => {
                alert(error);
            }, 400);
        });
}

const SubmitIdea = (props) => {
    return (
        <Modal
            portalElemId='create-idea-modal'
            className='idea-submission'
            onClick={props.closeModalHandler}>
            <div className='submit-panel'>
                <h2 className='submit-title'>Create idea</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values, { setSubmitting }) => handleSubmit(values)}>
                    {({
                        isSubmiting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <Form className='submit-form'>
                            <div>
                                <div>
                                    <div className='input-section'>
                                        <lable htmlFor='department'>Department</lable>
                                        <Select
                                            options={Departments}
                                            isClearable={true}
                                            placeholder={"Select depertment"} />
                                    </div>
                                    <div className='input-section'>
                                        <lable htmlFor='topic'>Topic</lable>
                                        <Select
                                            options={Topics}
                                            isClearable={true}
                                            placeholder={"Select topic"} />
                                    </div>
                                    <div className='input-section'>
                                        <lable htmlFor='tag'>Tag</lable>
                                        <Select
                                            options={Tags}
                                            isClearable={true}
                                            placeholder={"Select tag"} />
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <hr />
                            <div className='input-section'>
                                <TextField
                                    lable={'Title'}
                                    name='title'
                                    type='title'
                                    placeholder='Title'
                                />
                            </div>
                            <div className='input-section'>
                            <lable htmlFor='description'>Description</lable>
                                <textarea 
                                    name='description'
                                    rows={5} >
                                </textarea>
                            </div>
                            <div className='input-section'>
                                <TextField
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                />
                            </div>
                            <div className='input-section'>
                                <TextField
                                    name='email'
                                    type='email'
                                    placeholder='Email'
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Button onClick={props.closeModalHandler} buttonStyle='btn--modal'>
                Close Modal
            </Button>
        </Modal>
    );
};

export default SubmitIdea;
