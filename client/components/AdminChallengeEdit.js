import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
import MdEye from 'react-ionicons/lib/MdEye';
import IosCreate from 'react-ionicons/lib/IosCreate';
import MdClose from 'react-ionicons/lib/MdClose';

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

  const isIndividualChallenge =
    Object.keys(props.individualChallenge).length &&
    props.individualChallenge.id === Number(props.challengeId)
      ? true
      : false;

  const { solutions } = props.individualChallenge;
  let solutionHTML = '';
  let solutionCSS = '';

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
      solutionHTML = solutions[0].html;
      solutionCSS = solutions[0].css;
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
        console.log('resp.data: ', resp.data);
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
  };
  // CodeMirror settings (end)

  const imageSrc = image.length > 0 ? image : './images/img-preview.png';

  const actionText = isUpdate ? 'Edit' : 'Create';
  const actionTextBtn = isUpdate ? 'Update' : 'Save';

  return (
    <div id="admin-challenge-edit">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <h1 className="text-center mb-3">{actionText} Challenge</h1>
            <div className="text-center mb-4">
              <button
                className="btn btn-raised btn-sm mr-3 btn-info"
                type="button"
                title="Preview"
                onClick={preview}
              >
                <MdEye fontSize="2em" color="#fff" />
              </button>
              <button className="btn btn-raised btn-sm mr-3 btn-primary" type="submit" title="Save">
                <IosCreate fontSize="2em" color="#fff" />
              </button>
              <button
                className="btn btn-raised btn-sm mr-3 btn-warning"
                type="button"
                title="Cancel"
                onClick={cancel}
              >
                <MdClose fontSize="2em" color="#fff" />
              </button>
            </div>

            {/* form info */}
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
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
              <div className="col-sm-10">
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
              <label htmlFor="imageWidth" className="col-sm-2 col-form-label">
                Width
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="text"
                  name="imageWidth"
                  placeholder="width"
                  value={imageWidth}
                  onChange={e => setImageWidth(e.target.value)}
                />
              </div>
              <label htmlFor="imageHeight" className="col-sm-2 col-form-label">
                Height
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="text"
                  name="imageHeight"
                  placeholder="height"
                  value={imageHeight}
                  onChange={e => setImageHeight(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <img src={imageSrc} alt="" width="540" height="304" />
          </div>

          <div className="form-group row" style={codeMirrorStyle}>
            <label htmlFor="html" className="col-sm-1 col-form-label editor-type-label">
              HTML
            </label>
            <div className="col-sm-5">
              {html.length || !props.challengeId ? (
                <CodeMirror
                  value={html}
                  options={optionsHtml}
                  // defaultValue={html}
                  onChange={(value, eventData) => setHTML(value)}
                />
              ) : null}
            </div>
            <label htmlFor="css" className="col-sm-1 col-form-label editor-type-label">
              CSS
            </label>
            <div className="col-sm-5">
              {css.length || !props.challengeId ? (
                <CodeMirror
                  value={css}
                  options={optionsCss}
                  // defaultValue={css}
                  onChange={(value, eventData) => setCSS(value)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </form>
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
