const GuideLine = () => {
  return (
    <div className="p-14 flex flex-col gap-8 w-[1000px]">
      <div className="flex items-center">
        <div className="flex-grow">
          <button type="submit" className="bg-blue-700 text-white">
            Record
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>
        <div className="pl-24 text-white">Click to start speaking</div>
      </div>

      <div className="flex items-center">
        <div className="flex-grow">
          <button type="submit" className="bg-red-700 text-white">
            Stop
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>

        <div className="pl-24 text-white">Click to stop speaking</div>
      </div>

      <div className="flex items-center ">
        <div className="flex-grow">
          <button className="bg-red-700 text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="pl-24 text-white">
          Click to clear the previous audio
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex-grow">
          <button className="bg-green-700 text-white">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div className="pl-24 text-white">Click to send the message</div>
      </div>

      <div className="flex items-center ">
        <div className="flex-grow">
          <button className="bg-red-500 text-white">End Dialog</button>
        </div>
        <div className="pl-24 text-white">Click to end the dialog</div>
      </div>
      <div className="flex items-center">
        <div className="flex-grow">
          <button className="bg-indigo-500 text-white">Submit Dialog</button>
        </div>
        <div className="pl-16 text-white">
          <p>
            Click to submit the dialog, once you submit, the supervisor can view
            your conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideLine;
