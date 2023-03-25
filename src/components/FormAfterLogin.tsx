import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";

import Avatar from "./Avatar";
import Button from "./Button";

import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";

export interface FormAfterLoginProps {
  placeholder: string;
}

const FormAfterLogin: React.FC<FormAfterLoginProps> = ({ placeholder }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet Created!");

      setBody("");
      mutatePosts();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="flex flex-row gap-4">
      <div>
        <Avatar userId={currentUser?.id} />
      </div>
      <div className="w-full">
        <textarea
          disabled={isLoading}
          onChange={(event) => setBody(event.target.value)}
          value={body}
          placeholder={placeholder}
          className="
                      peer
                      mt-3
                      w-full
                      resize-none
                      bg-black
                      text-[20px]
                      text-white
                      placeholder-neutral-500
                      outline-none
                      ring-0
                      disabled:opacity-80
  
                  "
        ></textarea>
        <hr
          className="
                  h-[1px]
                  w-full
                  border-neutral-800
                  opacity-0
                  transition
                  peer-focus:opacity-100
              "
        />
        <div className="mt-4 flex flex-row justify-end">
          <Button
            label="Tweet"
            disabled={isLoading || !body}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAfterLogin;
