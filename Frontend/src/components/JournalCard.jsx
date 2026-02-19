import react from 'react'


const JournalCard = ({ journal, onEdit, onDelete, creationDate }) => {

  //Date ko achi format mai show krne k liye...
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-Pk", {
      timeZone: "Asia/Karachi",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: '2-digit',
      minute: 'numeric',
    });
  };



  return (
    <div className="h-full flex flex-col rounded-2xl shadow-md bg-white overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3">
        <h2 className="text-center text-sm sm:text-lg font-semibold text-white tracking-wide">
          {journal.title.toUpperCase()}
        </h2>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-5 space-y-3">

        {/* Date */}
        <p className="text-xs sm:text-sm text-gray-500">
          <span className="font-medium">Date:</span> {formatDate(creationDate)}
        </p>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Description
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {journal.desc}
          </p>
        </div>

        {/* Content */}
        <div className="border-l-4 border-slate-600 pl-3 bg-gray-50 rounded-r-md py-2">
          <p className="text-sm sm:text-base text-gray-800">
            {journal.content.length > 120
              ? journal.content.slice(0, 120) + "..."
              : journal.content}
          </p>
        </div>
      </div>

      {/* Actions – Always at Bottom */}
      <div className="border-t bg-gray-50 px-4 py-3 flex justify-end gap-3">
        <button
          onClick={() => onEdit(journal)}
          className="px-4 py-1.5 text-sm rounded-md text-blue-600 border border-blue-500 hover:bg-blue-50 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(journal._id)}
          className="px-4 py-1.5 text-sm rounded-md text-red-600 border border-red-500 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default JournalCard;
