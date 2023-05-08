import Navbar from './components/navbar';
import Footer from './components/footer';
import withAuth from './components/withAuth';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Head from 'next/head';
import Image from 'next/image';

const ImageUploader = () => {
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleDrop = (acceptedFiles) => {
        // Set the selected file to state
        setImageFile(acceptedFiles[0]);
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.type.includes("image/")) {
            setImageFile(selectedFile);
            setSuccess(false);
        } else {
            alert("Please select an image file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('filename', imageFile.name);

            const response = await fetch('http://localhost:4200/images', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <Navbar />
            <div className="imageUploader">
                <h1>Upload your image</h1>
                <p>File should be Jpeg, Png...</p>
                <div className="upload-options">
                    <Dropzone onDrop={handleDrop} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {imageFile ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(imageFile)}
                                            className="previewImage"
                                            alt="Selected image"
                                            width={250}
                                            height={250}
                                        />
                                    </>
                                ) : (
                                    <div className="image">
                                        <Image
                                            src="image.svg"
                                            alt="My Image"
                                            width={200}
                                            height={200}
                                            className="imagesvg"
                                        />
                                        <p>Drag & Drop your image here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    {!imageFile ? <p className='Alonep'>Or</p> : null}
                    <div className="file-input-container">
                        <input type="file" id="file-input" onChange={handleFileInput} hidden />
                        {!imageFile && (
                            <label htmlFor="file-input" className="file-input-label">
                                Choose a file
                            </label>
                        )}
                    </div>
                </div>
                {loading ? (
                    <div className="loading-container">
                        <p>Loading...</p>
                        <div className="loading-bar"></div>
                    </div>
                ) : (
                    <>
                        {imageFile && !success && (
                            <form onSubmit={handleSubmit}>
                                <input className="registerButton" type="submit" value="Upload image" />
                            </form>
                        )}
                        {success && <p>Image uploaded successfully!</p>}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default withAuth(ImageUploader);