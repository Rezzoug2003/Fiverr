import React from "react";
import { Link } from "react-router-dom";
import "./messages.scss";
import { newRequest } from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });
    const mutation = useMutation({
      mutationFn: (id) => {
        return newRequest.put(`/conversations/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["conversations"]);
      },
    });
  const handleRead = (id) => {
     mutation.mutate(id);
  }
  return (
    <div className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.data.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.data.isSeller && !c.readBySeller) ||
                    (!currentUser.data.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}>
                {currentUser.data.isSeller ? c.buyerId : c.sellerId}
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.data.isSeller && !c.readBySeller) ||
                    (!currentUser.data.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
