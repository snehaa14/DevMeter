import React, { useState } from 'react';
import img from '../assets/avatar2.jpg';
import Navbar from '../Components/Navbar';
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe, FaFacebook } from 'react-icons/fa';

const Profile = () => {
  // State variables for profile details
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Sneha Agrawal");
  const [email, setEmail] = useState("sneha.agrawal@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [mobile, setMobile] = useState("9876543210");
  const [collegeName, setCollegeName] = useState("Motilal Nehru National Institute Of Technology");
  
  // State variables for social media links
  const [portfolio, setPortfolio] = useState("https://yourportfolio.com");
  const [twitter, setTwitter] = useState("https://twitter.com/yourprofile");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/yourprofile");
  const [facebook, setFacebook] = useState("https://facebook.com/yourprofile");
  const [github, setGithub] = useState("https://github.com/yourprofile");

  // State variables for skill ratings
  const [skills, setSkills] = useState([
    { name: 'HTML', rating: 5 },
    { name: 'CSS', rating: 4 },
    { name: 'JavaScript', rating: 4 },
    { name: 'Node.js', rating: 3 },
    { name: 'MongoDB', rating: 3 },
    { name: 'React', rating: 4 }
  ]);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
  };

  return (
    <div className='w-full'>
      <Navbar />
      <div className='flex flex-row justify-center mt-28'>
        <div className='w-1/4 ml-5 mt-5'>
          <div className='bg-white bg-opacity-80 p-6 flex flex-col items-center justify-center rounded-md shadow-md text-center'>
            {/* Image (Square and larger) */}
            <img src={img} alt="Profile" className="w-72 h-72 rounded-md object-cover mb-6" />

            {/* Name */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{name}</h2>

            {/* College Name */}
            <p className="text-xl text-gray-600 mb-4">{collegeName}</p>

            {/* Social Media Links */}
            <div className="space-y-6 w-full">
              {/* Portfolio */}
              <div className="flex justify-center items-center space-x-3">
                <FaGlobe size={32} className="text-gray-800" />
                {isEditing ? (
                  <input
                    type="text"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="text-gray-800 p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900 text-lg">Portfolio</a>
                )}
              </div>

              {/* Twitter */}
              <div className="flex justify-center items-center space-x-3">
                <FaTwitter size={32} className="text-blue-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="text-blue-400 p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 text-lg">
                    myTwitterID
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <div className="flex justify-center items-center space-x-3">
                <FaLinkedin size={32} className="text-blue-700" />
                {isEditing ? (
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="text-blue-700 p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 text-lg">MyLinkedID</a>
                )}
              </div>

              {/* Facebook */}
              <div className="flex justify-center items-center space-x-3">
                <FaFacebook size={32} className="text-blue-600" />
                {isEditing ? (
                  <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="text-blue-600 p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-lg">
                    MyFacebookID
                  </a>
                )}
              </div>

              {/* GitHub */}
              <div className="flex justify-center items-center space-x-3">
                <FaGithub size={32} className="text-gray-600" />
                {isEditing ? (
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="text-gray-600 p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 text-lg">
                    MyGitubhubID
                  </a>
                )}
              </div>

              {/* Edit/Done Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={isEditing ? handleDoneClick : handleEditClick}
                  className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                >
                  {isEditing ? "Done" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='w-2/3 mt-5 ml-5 mr-5'>
          <div className="bg-white bg-opacity-80 p-6 rounded-md shadow-md border border-gray-300 mb-4 mx-auto">
            {/* Full Name */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">Full Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg text-gray-800 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-lg text-gray-800">{name}</p>
              )}
            </div>

            {/* College Name */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">College Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="text-lg text-gray-800 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-lg text-gray-800">{collegeName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg text-gray-800 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-lg text-gray-800">{email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">Phone:</span>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg text-gray-800 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-lg text-gray-800">{phone}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">Mobile Number:</span>
              {isEditing ? (
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="text-lg text-gray-800 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-lg text-gray-800">{mobile}</p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white bg-opacity-80 p-6 rounded-md shadow-md border border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h3>
            {skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg text-gray-700">{skill.name}</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={skill.rating}
                      onChange={(e) => handleSkillChange(index, 'rating', e.target.value)}
                      className="w-12 text-center text-gray-800 p-2 border border-gray-300 rounded-md"
                      min="1"
                      max="5"
                    />
                  ) : (
                    // Hide rating value when not in edit mode
                    <div className="w-12 h-6"></div>
                  )}
                </div>
                {/* Progress bar for skill rating */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full bg-pink-500`}
                    style={{ width: `${(skill.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
