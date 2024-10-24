import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { dataTrabajos } from '../../data/data';
import { MdKeyboardArrowLeft } from "react-icons/md";
import './ProjectDetails.css'

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = dataTrabajos.find((elem) => elem.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(project?.images[0]);
  const navigate = useNavigate();

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Container className='pt-5 pb-5'>
      <Row>
        <Col xs={12} md={6} >
          <div className='d-flex align-items-center pb-2'>
            <MdKeyboardArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
            <h5 className='projectTitle'>{project.title}</h5>
          </div>
          <p className='projectDescription'>{project.description}</p>
          <p>{project.material}</p>
          <p>{project.medida}</p>
        </Col>
        <Col xs={12} md={6}>
          <img className="d-block project-image w-100" src={`/assets/${project.carpeta}/${selectedImage}`} alt={project.title} />
        </Col>
      </Row>
      <Row className="pt-5">
        {project.images.map((image, index) => (
          <Col xs={3} md={2} key={index} className="mb-3">
            <img
              className={`thumbnail-image w-100 ${selectedImage === image ? 'selected-thumbnail' : ''}`}
              src={`/assets/${project.carpeta}/${image}`}
              alt={`Thumbnail ${index}`}
              loading="lazy"
              onClick={() => setSelectedImage(image)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
