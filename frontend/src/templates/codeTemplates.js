const codeTemplates = {
  javascript: {
    students: {
      getAll: `// Fetch all students (with filter support)
const response = await fetch('/api/students?course=Computer Science&status=active');
const result = await response.json();
console.log(result);`,
      getOne: `// Fetch a single student by ID
const response = await fetch('/api/students/1');
const result = await response.json();
console.log(result);`,
      create: `// Create a new student record
const response = await fetch('/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    age: 20,
    phone: "9812345678",
    course: "Computer Science",
    semester: 3,
    grade: "A",
    cgpa: 8.5,
    city: "Pune",
    state: "Maharashtra",
    enrollment_date: "2024-06-24",
    status: "active"
  })
});
const result = await response.json();
console.log(result);`,
      update: `// Update a student record by ID
const response = await fetch('/api/students/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    age: 21,
    phone: "9876543210",
    course: "Computer Science",
    semester: 4,
    grade: "A+",
    cgpa: 8.9,
    city: "Pune",
    state: "Maharashtra",
    enrollment_date: "2023-08-01",
    status: "active"
  })
});
const result = await response.json();
console.log(result);`,
      delete: `// Delete a student by ID
const response = await fetch('/api/students/50', {
  method: 'DELETE'
});
const result = await response.json();
console.log(result);`
    },
    courses: {
      getAll: `// Fetch all courses
const response = await fetch('/api/courses');
const result = await response.json();
console.log(result);`,
      getOne: `// Fetch a single course by ID
const response = await fetch('/api/courses/1');
const result = await response.json();
console.log(result);`,
      create: `// Create a new course record
const response = await fetch('/api/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    course_name: "Artificial Intelligence",
    department: "Engineering",
    duration_years: 4,
    total_seats: 40,
    fee_per_year: 98000
  })
});
const result = await response.json();
console.log(result);`,
      update: `// Update a course record by ID
const response = await fetch('/api/courses/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    course_name: "Computer Science & Engineering",
    department: "Engineering",
    duration_years: 4,
    total_seats: 70,
    fee_per_year: 88000
  })
});
const result = await response.json();
console.log(result);`,
      delete: `// Delete a course by ID
const response = await fetch('/api/courses/8', {
  method: 'DELETE'
});
const result = await response.json();
console.log(result);`
    },
    teachers: {
      getAll: `// Fetch all teachers
const response = await fetch('/api/teachers');
const result = await response.json();
console.log(result);`,
      getOne: `// Fetch a single teacher by ID
const response = await fetch('/api/teachers/1');
const result = await response.json();
console.log(result);`,
      create: `// Create a new teacher record
const response = await fetch('/api/teachers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Dr. Sandeep Patil",
    email: "sandeep.patil@college.com",
    subject: "Compiler Design",
    experience_years: 15,
    department: "Computer Science",
    phone: "9823456789"
  })
});
const result = await response.json();
console.log(result);`,
      update: `// Update a teacher record by ID
const response = await fetch('/api/teachers/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Dr. Priya Kulkarni",
    email: "priya.kulkarni@college.com",
    subject: "Advanced Data Structures",
    experience_years: 13,
    department: "Computer Science",
    phone: "9823456710"
  })
});
const result = await response.json();
console.log(result);`,
      delete: `// Delete a teacher by ID
const response = await fetch('/api/teachers/10', {
  method: 'DELETE'
});
const result = await response.json();
console.log(result);`
    }
  },
  python: {
    students: {
      getAll: `# Fetch all students (with filter support)
import requests

url = "https://yourdomain.com/api/students"
params = {
    "course": "Computer Science",
    "status": "active"
}

response = requests.get(url, params=params)
data = response.json()
print(data)`,
      getOne: `# Fetch a single student by ID
import requests

url = "https://yourdomain.com/api/students/1"
response = requests.get(url)
data = response.json()
print(data)`,
      create: `# Create a new student record
import requests

url = "https://yourdomain.com/api/students"
payload = {
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@example.com",
    "age": 20,
    "phone": "9812345678",
    "course": "Computer Science",
    "semester": 3,
    "grade": "A",
    "cgpa": 8.5,
    "city": "Pune",
    "state": "Maharashtra",
    "enrollment_date": "2024-06-24",
    "status": "active"
}

response = requests.post(url, json=payload)
data = response.json()
print(data)`,
      update: `# Update a student record by ID
import requests

url = "https://yourdomain.com/api/students/1"
payload = {
    "name": "Aditya Sharma",
    "email": "aditya.sharma@example.com",
    "age": 21,
    "phone": "9876543210",
    "course": "Computer Science",
    "semester": 4,
    "grade": "A+",
    "cgpa": 8.9,
    "city": "Pune",
    "state": "Maharashtra",
    "enrollment_date": "2023-08-01",
    "status": "active"
}

response = requests.put(url, json=payload)
data = response.json()
print(data)`,
      delete: `# Delete a student by ID
import requests

url = "https://yourdomain.com/api/students/50"
response = requests.delete(url)
data = response.json()
print(data)`
    },
    courses: {
      getAll: `# Fetch all courses
import requests

url = "https://yourdomain.com/api/courses"
response = requests.get(url)
data = response.json()
print(data)`,
      getOne: `# Fetch a single course by ID
import requests

url = "https://yourdomain.com/api/courses/1"
response = requests.get(url)
data = response.json()
print(data)`,
      create: `# Create a new course record
import requests

url = "https://yourdomain.com/api/courses"
payload = {
    "course_name": "Artificial Intelligence",
    "department": "Engineering",
    "duration_years": 4,
    "total_seats": 40,
    "fee_per_year": 98000
}

response = requests.post(url, json=payload)
data = response.json()
print(data)`,
      update: `# Update a course record by ID
import requests

url = "https://yourdomain.com/api/courses/1"
payload = {
    "course_name": "Computer Science & Engineering",
    "department": "Engineering",
    "duration_years": 4,
    "total_seats": 70,
    "fee_per_year": 88000
}

response = requests.put(url, json=payload)
data = response.json()
print(data)`,
      delete: `# Delete a course by ID
import requests

url = "https://yourdomain.com/api/courses/8"
response = requests.delete(url)
data = response.json()
print(data)`
    },
    teachers: {
      getAll: `# Fetch all teachers
import requests

url = "https://yourdomain.com/api/teachers"
response = requests.get(url)
data = response.json()
print(data)`,
      getOne: `# Fetch a single teacher by ID
import requests

url = "https://yourdomain.com/api/teachers/1"
response = requests.get(url)
data = response.json()
print(data)`,
      create: `# Create a new teacher record
import requests

url = "https://yourdomain.com/api/teachers"
payload = {
    "name": "Dr. Sandeep Patil",
    "email": "sandeep.patil@college.com",
    "subject": "Compiler Design",
    "experience_years": 15,
    "department": "Computer Science",
    "phone": "9823456789"
}

response = requests.post(url, json=payload)
data = response.json()
print(data)`,
      update: `# Update a teacher record by ID
import requests

url = "https://yourdomain.com/api/teachers/1"
payload = {
    "name": "Dr. Priya Kulkarni",
    "email": "priya.kulkarni@college.com",
    "subject": "Advanced Data Structures",
    "experience_years": 13,
    "department": "Computer Science",
    "phone": "9823456710"
}

response = requests.put(url, json=payload)
data = response.json()
print(data)`,
      delete: `# Delete a teacher by ID
import requests

url = "https://yourdomain.com/api/teachers/10"
response = requests.delete(url)
data = response.json()
print(data)`
    }
  },
  php: {
    students: {
      getAll: `<?php
// Fetch all students (with filter support)
$url = "https://yourdomain.com/api/students?course=Computer+Science&status=active";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      getOne: `<?php
// Fetch a single student by ID
$url = "https://yourdomain.com/api/students/1";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      create: `<?php
// Create a new student record
$url = "https://yourdomain.com/api/students";
$payload = json_encode([
    "name" => "Rajesh Kumar",
    "email" => "rajesh.kumar@example.com",
    "age" => 20,
    "phone" => "9812345678",
    "course" => "Computer Science",
    "semester" => 3,
    "grade" => "A",
    "cgpa" => 8.5,
    "city" => "Pune",
    "state" => "Maharashtra",
    "enrollment_date" => "2024-06-24",
    "status" => "active"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      update: `<?php
// Update a student record by ID
$url = "https://yourdomain.com/api/students/1";
$payload = json_encode([
    "name" => "Aditya Sharma",
    "email" => "aditya.sharma@example.com",
    "age" => 21,
    "phone" => "9876543210",
    "course" => "Computer Science",
    "semester" => 4,
    "grade" => "A+",
    "cgpa" => 8.9,
    "city" => "Pune",
    "state" => "Maharashtra",
    "enrollment_date" => "2023-08-01",
    "status" => "active"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      delete: `<?php
// Delete a student by ID
$url = "https://yourdomain.com/api/students/50";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`
    },
    courses: {
      getAll: `<?php
// Fetch all courses
$url = "https://yourdomain.com/api/courses";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      getOne: `<?php
// Fetch a single course by ID
$url = "https://yourdomain.com/api/courses/1";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      create: `<?php
// Create a new course record
$url = "https://yourdomain.com/api/courses";
$payload = json_encode([
    "course_name" => "Artificial Intelligence",
    "department" => "Engineering",
    "duration_years" => 4,
    "total_seats" => 40,
    "fee_per_year" => 98000
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      update: `<?php
// Update a course record by ID
$url = "https://yourdomain.com/api/courses/1";
$payload = json_encode([
    "course_name" => "Computer Science & Engineering",
    "department" => "Engineering",
    "duration_years" => 4,
    "total_seats" => 70,
    "fee_per_year" => 88000
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      delete: `<?php
// Delete a course by ID
$url = "https://yourdomain.com/api/courses/8";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`
    },
    teachers: {
      getAll: `<?php
// Fetch all teachers
$url = "https://yourdomain.com/api/teachers";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      getOne: `<?php
// Fetch a single teacher by ID
$url = "https://yourdomain.com/api/teachers/1";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      create: `<?php
// Create a new teacher record
$url = "https://yourdomain.com/api/teachers";
$payload = json_encode([
    "name" => "Dr. Sandeep Patil",
    "email" => "sandeep.patil@college.com",
    "subject" => "Compiler Design",
    "experience_years" => 15,
    "department" => "Computer Science",
    "phone" => "9823456789"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      update: `<?php
// Update a teacher record by ID
$url = "https://yourdomain.com/api/teachers/1";
$payload = json_encode([
    "name" => "Dr. Priya Kulkarni",
    "email" => "priya.kulkarni@college.com",
    "subject" => "Advanced Data Structures",
    "experience_years" => 13,
    "department" => "Computer Science",
    "phone" => "9823456710"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`,
      delete: `<?php
// Delete a teacher by ID
$url = "https://yourdomain.com/api/teachers/10";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data);
curl_close($ch);
?>`
    }
  },
  java: {
    students: {
      getAll: `// Fetch all students using Java's HttpClient
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/students?course=Computer%20Science&status=active"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}`,
      getOne: `// Fetch a single student by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/students/1"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      create: `// Create a new student record
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@example.com",
                "age": 20,
                "phone": "9812345678",
                "course": "Computer Science",
                "semester": 3,
                "grade": "A",
                "cgpa": 8.5,
                "city": "Pune",
                "state": "Maharashtra",
                "enrollment_date": "2024-06-24",
                "status": "active"
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/students"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      update: `// Update a student record by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "name": "Aditya Sharma",
                "email": "aditya.sharma@example.com",
                "age": 21,
                "phone": "9876543210",
                "course": "Computer Science",
                "semester": 4,
                "grade": "A+",
                "cgpa": 8.9,
                "city": "Pune",
                "state": "Maharashtra",
                "enrollment_date": "2023-08-01",
                "status": "active"
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/students/1"))
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      delete: `// Delete a student by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/students/50"))
            .DELETE()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`
    },
    courses: {
      getAll: `// Fetch all courses
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/courses"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      getOne: `// Fetch a single course by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/courses/1"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      create: `// Create a new course record
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "course_name": "Artificial Intelligence",
                "department": "Engineering",
                "duration_years": 4,
                "total_seats": 40,
                "fee_per_year": 98000
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/courses"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      update: `// Update a course record by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "course_name": "Computer Science & Engineering",
                "department": "Engineering",
                "duration_years": 4,
                "total_seats": 70,
                "fee_per_year": 88000
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/courses/1"))
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      delete: `// Delete a course by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/courses/8"))
            .DELETE()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`
    },
    teachers: {
      getAll: `// Fetch all teachers
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/teachers"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      getOne: `// Fetch a single teacher by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/teachers/1"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      create: `// Create a new teacher record
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "name": "Dr. Sandeep Patil",
                "email": "sandeep.patil@college.com",
                "subject": "Compiler Design",
                "experience_years": 15,
                "department": "Computer Science",
                "phone": "9823456789"
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/teachers"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      update: `// Update a teacher record by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String jsonPayload = """
            {
                "name": "Dr. Priya Kulkarni",
                "email": "priya.kulkarni@college.com",
                "subject": "Advanced Data Structures",
                "experience_years": 13,
                "department": "Computer Science",
                "phone": "9823456710"
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/teachers/1"))
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      delete: `// Delete a teacher by ID
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://yourdomain.com/api/teachers/10"))
            .DELETE()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`
    }
  }
};

export default codeTemplates;
