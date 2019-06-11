import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import { createImage } from '../../server/puppeteer-utils';

export const AdminChallengeEdit = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');

  // TODO upload image file, convert to binary, save in db
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [imageUpdateTime, setImageUpdateTime] = useState('');

  useEffect(() => {
    setTimeout(() => {
      console.log('refreshed');
    }, 0);
  }, [imageUpdateTime]);

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

    console.log('challenge: ', challenge);
    axios
      .post('api/challenges', challenge)
      .then(() => props.history.push('/admin/challenges'))
      .catch(err => console.log(err));
  };

  const preview = () => {
    // refactor createFiles & createImages from puppeteer-utils
    // const dir = process.cwd();
    // console.log('dir: ', dir);
    // dir += '';
    // createFiles(html, css, 'preview', '')
    const challenge = {
      html,
      css,
      imageWidth,
      imageHeight,
    };
    axios
      .put('/api/challenges/preview', challenge)
      .then(({ data }) => {
        const timeStamp = data;
        console.log('timeStamp: ', timeStamp);
        setImageUpdateTime(timeStamp);
        console.log('imageUpdateTime: ', imageUpdateTime);
      })
      .catch(err => console.log(err));
  };

  console.log('imageUpdateTime - before: ', imageUpdateTime);
  return (
    <div className="row">
      <div className="col-8">
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
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
            <div className="col-sm-1">
              <select
                className="form-control"
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
          <div className="form-group row">
            <label htmlFor="html" className="col-sm-2 col-form-label">
              HTML
            </label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="10"
                name="html"
                value={html}
                onChange={e => setHtml(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="css" className="col-sm-2 col-form-label">
              CSS
            </label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="10"
                name="css"
                value={css}
                onChange={e => setCss(e.target.value)}
              />
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
          <button type="button" onClick={preview}>
            Preview
          </button>
          <button type="submit">Save Challenge</button>
        </form>
      </div>
      <div className="col-4">
        <h2>Image Preview</h2>
        <img src="/images/preview.png" alt="" />
      </div>
    </div>
  );
};
