import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin',
    designation: 'System Administrator'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedImage = localStorage.getItem('profileImage');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    }
  }, [profileImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img 
              src={profileImage || 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Photo.png'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
              <input 
                type="file" 
                className="hidden"
                onChange={handleImageUpload}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </label>
          </div>

          <div className="flex-1 w-full">
            {editMode ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="text-xl font-bold w-full p-1 border rounded"
                />
                <input
                  type="text"
                  name="designation"
                  value={profile.designation}
                  onChange={handleInputChange}
                  className="text-gray-600 w-full p-1 border rounded"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p className="text-gray-600">{profile.designation}</p>
              </div>
            )}
            
            <button 
              onClick={() => setEditMode(!editMode)}
              className="mt-2 text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600">Total Complaints</p>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div>
            <p className="text-gray-600">Pending</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div>
            <p className="text-gray-600">Resolved</p>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div>
            <p className="text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold">94%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Recent Complaints</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2">ID</th>
                <th className="pb-2">Subject</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#12345', subject: 'Network Connectivity Issue', date: '2024-02-20', status: 'Pending' },
                { id: '#12344', subject: 'Software Installation Request', date: '2024-02-19', status: 'Approved' },
                { id: '#12343', subject: 'Hardware Replacement', date: '2024-02-18', status: 'Rejected' },
              ].map((complaint) => (
                <tr key={complaint.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{complaint.id}</td>
                  <td>{complaint.subject}</td>
                  <td>{complaint.date}</td>
                  <td>
                    <span className={`px-2 py-1 rounded ${complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      complaint.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    <div className="gap-4">
                    <button className="text-blue-500 hover:text-blue-700 px-2 border rounded border-blue-500">
                      Approve
                    </button>
                    <button className="text-green-500 hover:text-green-700 px-2 mx-2 border rounded border-green-500">
                      Resolve
                    </button>
                    <button className="text-red-500 hover:text-red-700 px-2 border rounded border-red-500">
                      Reject
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-gray-600">Showing 1 to 3 of 12 results</p>
      </div>
    </div>
  );
};

export default AdminDashboard;