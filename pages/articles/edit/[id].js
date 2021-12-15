import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Form.module.css";
import Modal from "@/components/Modal";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

export default function EditArticles({ articles }) {
  const [values, setValues] = useState({
    name: articles.name,
    detail: articles.detail,
    date: articles.date,
    time: articles.time,
  });
  const [imagePreview, setImagePreview] = useState(
    articles.image ? articles.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const { name, detail, date, time } = values;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("please fill all the field");
    }
    const response = await fetch(`${API_URL}/sports/${articles.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      toast.error("Something is error");
    } else {
      const sport = await response.json();
      router.push(`/articles/${sport.slug}`);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/sports/${articles.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };
  return (
    <Layout title="Add Articles">
      <Link href="/news">
        <a>Go Back</a>
      </Link>
      <h1>ADD ARTICLES</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              placeholder="Title"
              type="text"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              name="date"
              id="date"
              placeholder="Date"
              type="date"
              value={moment(date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="time">Time</label>
            <input
              name="time"
              id="time"
              placeholder="Time"
              type="time"
              value={time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="Detail">Write Here</label>
            <textarea
              name="detail"
              id="detail"
              placeholder="Write your Post Here....."
              type="text"
              value={detail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <input className="btn" type="submit" value="Update Post" />
      </form>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={180} />
      ) : (
        <div>
          <p>No image available</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-edit">
          Upload Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload sportNewsId={articles.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  console.log(req.headers.cookie);
  const res = await fetch(`${API_URL}/sports/${id}`);
  const articles = await res.json();
  return {
    props: {
      articles,
    },
  };
}
