"use client"
import React from 'react'
import { UploadButton } from '~/components/uploadThing';

const UploadTryout = () => {
  return (
<main>
<UploadButton
        endpoint="imageUploader"
        // onClientUploadComplete={(res) => {
        //   // Do something with the response
        //   console.log("Files: ", res);
        //   alert("Upload Completed");
        // }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(JSON.stringify(error.cause));
          alert(`ERROR! ya zebbi ${error.message}`);
        }}
      />
</main>  )
}

export default UploadTryout