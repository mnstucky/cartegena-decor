import React, { useState } from 'react';
import ItemImage from './ItemImage';

function AdminItemContainer({
  selection,
  setSelection,
  item,
  itemUrl,
  options,
}) {
  const [description, setDescription] = useState(item.description);
  const [features, setFeatures] = useState(item.features);
  const [highlights, setHighlights] = useState(item.highlights);
  function handleSubmit(event) {
    event.preventDefault();
  }
  function handleDescriptionChange(event) {
    const newDescription = [];
    description.forEach((bullet, index) => {
      if (parseInt(event.target.id, 10) === index) {
        newDescription.push(event.target.value);
      } else {
        newDescription.push(bullet);
      }
    });
    setDescription(newDescription);
  }
  function handleFeatureChange(event) {
    const newFeatures = [];
    features.forEach((bullet, index) => {
      if (parseInt(event.target.id, 10) === index) {
        newFeatures.push(event.target.value);
      } else {
        newFeatures.push(bullet);
      }
    });
    setFeatures(newFeatures);
  }
  function handleHighlightChange(event) {
    setHighlights(event.target.value);
  }
  function handleSelection(event) {
    setSelection(event.target.value);
    event.preventDefault();
  }
  // Declare iterable indices for fields that are arrays; indices are used to identify
  //    the correct index to update in the handler functions
  let descriptionId = 0;
  let featureId = 0;
  return (
    <div className="container pl-3 pr-3">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <ItemImage selection={selection} item={item} itemUrl={itemUrl} />
          <section className="box content">
            <h6>Make a Selection to View Image:</h6>
            <div className="select mb-2 mr-2">
              <select value={selection} onChange={handleSelection}>
                <option value="default">Default View</option>
                {options.map((productType) => (
                  <option value={productType}>{productType}</option>
                ))}
              </select>
            </div>
          </section>
        </div>
        <div className="column">
          <section className="box content">
            <form onSubmit={handleSubmit}>
              <label className="label">
                <h6>Description:</h6>
                {description.map((bullet) => (
                  <div className="field">
                    <textarea className="textarea" rows="2" value={bullet} id={descriptionId++} onChange={handleDescriptionChange} />
                  </div>
                ))}
              </label>
              <label className="label">
                <h6>Features:</h6>
                {features.map((bullet) => (
                  <div className="field">
                    <textarea className="textarea" rows="2" value={bullet} id={featureId++} onChange={handleFeatureChange} />
                  </div>
                ))}
              </label>
              <label className="label">
                <h6>Highlights:</h6>
                <div className="field">
                  <textarea className="textarea" rows="2" value={highlights} onChange={handleHighlightChange} />
                </div>
              </label>
              <input className="button is-primary" type="submit" value="Save Changes" />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminItemContainer;