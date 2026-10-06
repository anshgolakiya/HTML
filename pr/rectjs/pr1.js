function Profile() {
    const profile = {
        name: "Ansh",
        age: 20,
        course: "Computer Engineering",
        email: "ansh@gmail.com",
        city: "Surat"
    };

    return (
        <div>
            <h1>Student Profile</h1>

            <p><b>Name:</b> {profile.name}</p>
            <p><b>Age:</b> {profile.age}</p>
            <p><b>Course:</b> {profile.course}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>City:</b> {profile.city}</p>
        </div>
    );
}

function App() {
    return (
        <Profile />
    );
}

export default App;