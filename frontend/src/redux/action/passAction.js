import {
  ADD_PASSCAT,
  FETCH_PASSCAT,
  EDIT_PASSCAT,
  UPDATE_PASSCAT,
  DELETE_PASSCAT,
} from "./passType";
const axios = require("axios");

export const addPassCat = (category, user_id) => {
  var OPTIONS = {
    url: "http://localhost:5000/api/add-category/",
    method: "POST",
    data: { passwordCategory: category, user_id: user_id },
    headers: {
      "content-type": "application/json",
      //Authorization:
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkluZHVsYXRhIiwidXNlcmlkIjoiNWViNmZmMzE2MzFkZTEyYjQ4NzMzYzZmIiwiaWF0IjoxNTkwODIxNjcwLCJleHAiOjE1OTA4MjUyNzB9.7XOP5Mx8M0UGNpFYCKLxrPlCb6sVhag1FVjKdXmXK8A",
    },
  };

  axios(OPTIONS);
  return {
    type: ADD_PASSCAT,
    payload: category,
  };
};

export const fetchPassCat = (user_id) => {
  return function (dispatch) {
    var OPTIONS = {
      url: "http://localhost:5000/api/getCategory/" + user_id,
      method: "GET",
      headers: {
        "content-type": "application/json",
        //Authorization:
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkluZHVsYXRhIiwidXNlcmlkIjoiNWViNmZmMzE2MzFkZTEyYjQ4NzMzYzZmIiwiaWF0IjoxNTkwODIxNjcwLCJleHAiOjE1OTA4MjUyNzB9.7XOP5Mx8M0UGNpFYCKLxrPlCb6sVhag1FVjKdXmXK8A",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const categories = res.data.results;
        dispatch(getPassCat(categories));
        //console.log(categories);
      })
      .catch((err) => console.log(err));
    return {
      type: FETCH_PASSCAT,
      //payload: allcategories,
    };
  };
};

export const getPassCat = (categories) => {
  return {
    type: FETCH_PASSCAT,
    payload: categories,
  };
};

export const editPassCat = (id, categories) => {
  return {
    type: EDIT_PASSCAT,
    payload: categories,
    id: id,
  };
};

export const updatePassCat = (id, category) => {
  var OPTIONS = {
    url: "http://localhost:5000/api/update-category",
    method: "PATCH",
    data: { _id: id, passwordCategory: category },
    headers: {
      //Authorization:
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkluZHVsYXRhIiwidXNlcmlkIjoiNWViNmZmMzE2MzFkZTEyYjQ4NzMzYzZmIiwiaWF0IjoxNTkwODIxNjcwLCJleHAiOjE1OTA4MjUyNzB9.7XOP5Mx8M0UGNpFYCKLxrPlCb6sVhag1FVjKdXmXK8A",
      "content-type": "application/json",
    },
  };

  axios(OPTIONS)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return {
    type: UPDATE_PASSCAT,
    payload: category,
  };
};

export const deletePassCat = (id) => {
  var OPTIONS = {
    url: "http://localhost:5000/api/delete-category/",
    method: "DELETE",
    data: { cat_id: id },
    headers: {
      //Authorization:
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkluZHVsYXRhIiwidXNlcmlkIjoiNWViNmZmMzE2MzFkZTEyYjQ4NzMzYzZmIiwiaWF0IjoxNTkwODIxNjcwLCJleHAiOjE1OTA4MjUyNzB9.7XOP5Mx8M0UGNpFYCKLxrPlCb6sVhag1FVjKdXmXK8A",
      "content-type": "application/json",
    },
  };

  axios(OPTIONS)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return {
    type: DELETE_PASSCAT,
    payload: id,
  };
};
