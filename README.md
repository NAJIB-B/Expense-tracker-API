<h1 align=center>Expense Tracker API</h1>
<h1>Overview</h1>
<img src="https://assets.roadmap.sh/guest/expense-tracker-api-m72p5.png" alt="project architecture">
<h3>This API let's you do the following</h3>
<ul>
  <li>Register User</li>
  <li>Login User</li>
  <li>Create a new expense</li>
  <li>Update an expense</li>
   <li>Delete an expense</li>
   <li>get an expense</li>
   <li>get all expense: you can also specify filters e.g lastweek, lastMonth or custom dates</li>
</ul>

<h4>Project idea from: <a href="https://roadmap.sh/projects/expense-tracker-api">https://roadmap.sh/projects/expense-tracker-api</a></h4>

<h2>How to run the project</h2>
<ol>
  <li><strong>Clone the project repo</strong></li>
  <pre><code>git clone https://github.com/NAJIB-B/Expense-tracker-API.git</code></pre>

  <li><strong>Navigate into the project directory</strong></li>
  <pre><code>cd Expense-tracker-API</code></pre>

  <li><strong>Install the dependencies</strong></li>
  <pre><code>npm install</code></pre>

  <li><strong>Create your own MongoDB database</strong></li>
   <p>(I used <a href="https://www.mongodb.com/products/platform/atlas-database">MongoDB Atlas</a>)</p>

  <li><strong>Create your <code>.env</code> file</strong></li>
  <pre><code>touch .env</code></pre>

  <li><strong>Add the following environment variables</strong></li>
  <p>Populate the <code>.env</code> file with the following variables, replacing the placeholders with your own details:</p>

  <pre><code>DATABASE="mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/&lt;database-name&gt;?retryWrites=true&amp;w=majority&amp;appName=Cluster0"
DATABASE_PASSWORD=&lt;your-database-password&gt;
PORT=&lt;port&gt;
JWT_ACCESS_SECRET=&lt;your-access-token-secret&gt;
JWT_ACCESS_EXPIRES_IN=&lt;time-for-expiry&gt;
JWT_REFRESH_SECRET=&lt;your-access-token-secret&gt;
JWT_REFRESH_EXPIRES_IN=&lt;time-for-expiry&gt;
  
  </code></pre>

  <p><strong>Note:</strong></p>
  <ul>
    <li>Replace <code>&lt;username&gt;</code>, <code>&lt;database-name&gt;</code>, and other placeholders with the relevant details.</li>
    <li><strong>Do not replace</strong> the <code>&lt;password&gt;</code> placeholder in the connection string. It will be automatically substituted with the <code>DATABASE_PASSWORD</code> value you define.</li>
  </ul>

  <li><strong>Run the project</strong></li>
  <pre><code>npm start</code></pre>
</ol>


