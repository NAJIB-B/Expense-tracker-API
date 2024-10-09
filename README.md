<h1>Expense Tracker API</h1>
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
<p>Clone the project repo</p>
<p><code>git clone https://github.com/NAJIB-B/Expense-tracker-API.git</code></p>

<p>navigate into the project directory</p>
<p><code>cd Expense-tracker-API</code></p>

<p>Install the dependencies</p>
<p><code>npm install</code></p>

<p>Create your own mongodb database (I used <a href="https://www.mongodb.com/products/platform/atlas-database">mongodb atlas</a>)</p>
<p>create your .env file</p>
<p><code>touch .env</code></p>

<p>Create the following variables and fill it up with own details</p>
<p><code>DATABASE="your database connection string"</code></p> <p><code>//in this format "mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.ojffk.mongodb.net/&lt;database name&gt;?retryWrites=true&w=majority&appName=Cluster0"</code></p>

  <i>NOTE: In the example string above the "&lt;password&gt;" should not be changed (meaning username, database name and cluster text should be from your own database.).</i>
  <i>Why the password should remain like that is because it will be taken from the password field below</i>
    
<p><code>DATABASE_PASSWORD="your database password"</code></p>
<p><code>PORT=3000</code></p>

<p><code>JWT_ACCESS_SECRET=your-access-token-secret</code></p>
<p><code>JWT_ACCESS_EXPIRES_IN=time-for-expiry</code></p>

<p><code>JWT_REFRESH_SECRET=your-access-token-secret</code></p>
<p><code>JWT_REFRESH_EXPIRES_IN=time-for-expiry</code></p>
<p>Run the project</p>
<code>npm start</code>

<h2>API Endpoints</h2>
<h3>User</h3>
<ul>
  <li>POST /api/v1/user/register</li>
<li>POST /api/v1/user/login</li>
  <li>POST /api/v1/user/refresh</li>
</ul>

<h3>Todos</h3>
<ul>
  <li>POST /api/v1/expense</li> 
 <li>PATCH /api/v1/expense/:id</li>
 <li>DELETE /api/v1/expense/:id</li>
 <li>GET /api/v1/expense/:id</li>
   <li>GET /api/v1/expense</li>
  <p></p>
  <p> You can spcify filters for the GET endpoint e.g lastWeek, lastMonth, last3Months or custom filter. see the documentation for full details <a href="#">documentaion</a></p>
</ul>
