import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await axios.patch("/api/edit", { name, username, bio, profileImage, coverImage });
      mutateFetchedUser();
      toast.success("Profile updated");
      editModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={loading} />
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={loading} />
      <Input placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} disabled={loading} />
    </div>
  );
  return (
    <Modal
      disabled={loading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLable="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
