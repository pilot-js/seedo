import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
import MdEye from 'react-ionicons/lib/MdEye';
import MdSync from 'react-ionicons/lib/MdSync';
import MdClose from 'react-ionicons/lib/MdClose';

import { convertBufferToImgSrc } from '../utils';
import { fetchOneChallenge } from '../store';

// CodeMirror formating & highlighting
require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/markdown/markdown');

const _AdminChallengeEdit = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [imageWidth, setImageWidth] = useState('540');
  const [imageHeight, setImageHeight] = useState('304');
  const [image, setImage] = useState({ data: '' });
  const [errors, setErrors] = useState([]);

  // true = update existing challenge
  const isUpdate = props.challengeId ? true : false;

  const isIndividualChallenge = Object.keys(props.individualChallenge).length ? true : false;

  useEffect(() => {
    document.getElementById('name').focus();

    if (props.challengeId) {
      props.fetchOneChallenge(props.challengeId);
    }
  }, []);

  useEffect(() => {
    if (isUpdate && isIndividualChallenge) {
      const { individualChallenge } = props;
      setName(individualChallenge.name);
      setDescription(individualChallenge.description);
      setDifficulty(individualChallenge.difficulty);

      const { solutions, images } = props.individualChallenge;
      setHTML(solutions[0].html);
      setCSS(solutions[0].css);
      setImageWidth(images[0].width || 540);
      setImageHeight(images[0].height || 304);
    }
  }, [props.individualChallenge]);

  const handleSubmit = ev => {
    ev.preventDefault();
    const challenge = {
      name,
      description,
      difficulty,
      html,
      css,
      imageWidth,
      imageHeight,
    };

    if (isUpdate) {
      const { id } = props.individualChallenge;
      axios
        .put(`/api/challenges/${id}`, challenge)
        // .then(resp => console.log(resp.data))
        .then(() => {
          props.history.push('/admin/challenges');
        })
        .catch(error => {
          console.log(error);
          setErrors([...errors, error]);
        });
    } else {
      axios
        .post('api/challenges', challenge)
        .then(() => {
          props.history.push('/admin/challenges');
        })
        .catch(error => {
          console.log(error);
          setErrors([...errors, error]);
        });
    }
  };

  const preview = () => {
    const challenge = {
      html,
      css,
      imageWidth,
      imageHeight,
      userId: props.user.id,
    };
    axios
      .put('/api/challenges/preview', challenge)
      .then(resp => {
        setImage(resp.data);
      })
      .catch(error => {
        console.log(error);
        setErrors([...errors, error]);
      });
  };

  const cancel = () => {
    props.history.push('/admin/challenges');
  };

  // CodeMirror settings (begin)
  const optionsHtml = {
    lineNumbers: true,
    mode: 'xml',
    theme: 'monokai',
  };

  const optionsCss = {
    lineNumbers: true,
    mode: 'css',
    theme: 'monokai',
  };

  const codeMirrorStyle = {
    width: '100%',
    // visibility: showCodeMirror ? 'visible' : 'hidden',
  };
  // CodeMirror settings (end)

  const imageSrc = image.length > 0 ? image : null;

  const actionText = isUpdate ? 'Edit' : 'Create';
  const actionTextBtn = isUpdate ? 'Update' : 'Save';

  return (
    <div id="admin-challenge-edit">
      <h1>{actionText} Challenge</h1>
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-9">
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-9">
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="difficulty" className="col-sm-2 col-form-label">
                Difficulty
              </label>
              <div className="col-sm-2">
                <select
                  className="custom-select"
                  name="difficulty"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div
              className="form-group row"
              // style={codeMirrorStyle}
            >
              <label htmlFor="html" className="col-sm-2 col-form-label">
                HTML
              </label>
              <div className="col-sm-9">
                <CodeMirror
                  value={html}
                  options={optionsHtml}
                  onChange={(value, eventData) => setHTML(value)}
                  // onChange={e => setHTML(e.target.value)}
                />
                {/* <textarea
                  className="form-control"
                  rows="10"
                  name="html"
                  value={html}
                  onChange={e => setHTML(e.target.value)}
                /> */}
              </div>
            </div>
            <div className="form-group row" style={codeMirrorStyle}>
              <label htmlFor="css" className="col-sm-2 col-form-label">
                CSS
              </label>
              <div className="col-sm-9">
                <CodeMirror
                  value={css}
                  options={optionsCss}
                  onChange={(value, eventData) => setCSS(value)}
                  // onChange={e => setCSS(e.target.value)}
                />
                {/* <textarea
                  className="form-control"
                  rows="10"
                  name="css"
                  value={css}
                  onChange={e => setCSS(e.target.value)}
                /> */}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="imageWidth" className="col-sm-2 col-form-label">
                Image Width
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="imageWidth"
                  value={imageWidth}
                  onChange={e => setImageWidth(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="imageHeight" className="col-sm-2 col-form-label">
                Image Height
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  name="imageHeight"
                  value={imageHeight}
                  onChange={e => setImageHeight(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center">
              {/* Preview  */}
              <button
                className="btn btn-raised btn-sm mr-3 btn-info"
                type="button"
                onClick={preview}
              >
                <MdEye fontSize="2em" color="#fff" />
              </button>
              {/* Challenge */}
              <button className="btn btn-raised btn-sm mr-3 btn-primary" type="submit">
                <MdSync fontSize="2em" color="#fff" />
              </button>
              {/* Cancel  */}
              <button
                className="btn btn-raised btn-sm mr-3 btn-warning"
                type="button"
                onClick={cancel}
              >
                <MdClose fontSize="2em" color="#fff" />
              </button>
            </div>
          </form>
        </div>
        <div className="col-6">
          <h2>Image Preview</h2>
          <img src={imageSrc} alt="" width="540" height="304" className="border" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, individualChallenge }) => {
  return { user, individualChallenge };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  };
};

export const AdminChallengeEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_AdminChallengeEdit);
