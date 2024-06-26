import "./reviews.scss";
import React from 'react'
import { Review } from "../review/Review";
import { newRequest } from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const Reviews = ({ gigId }) => {
const queryClient = useQueryClient();
 const { isLoading, error, data } = useQuery({
   queryKey: ["reviews"],
   queryFn: () =>
     newRequest.get(`/reviews/${gigId}`).then((res) => {
       return res.data;
     }),
 });
    const mutation = useMutation({
      mutationFn: (review) => {
        return newRequest.post("/reviews", review);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"]);
      },
    });
  const handleSubmit= (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({desc, star,gigId})
 }
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "something went wrong"
          : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">


      <form action="" className="addForm" onSubmit={handleSubmit}>
        <input type="text" placeholder="write your opinion" />
        <select name="" id="">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button>Send</button>
        </form>
        </div>
    </div>
  );
};
