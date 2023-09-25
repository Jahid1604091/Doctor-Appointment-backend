D = Done
O = Optional
Frontend URL : https://doct-appoint.netlify.app/
Backendend URL : https://prussian-blue-monkey-kilt.cyclic.cloud/
### ::Features:: ###
-----------------------------------------
#### Auth -> 
            1. Normal Registration (D)
            2. Google OAuth/PassportJs (D)
            3. Forgot and Reset Password with mail (D)
            4. Remember Me
            5. Verification with E-mail
            6. OTP 
            7. refresh token

#### Home ->
            1. Add Doctor No, Location, Chamber, Others
            2. Pagination (D)
            3. My Upcoming Appointments*
            4. Search desired doctor (D)
            5. Location/Area based Doctor
            6. Active/Inactive Online

#### Apply as doctor/Doctor ->
            1. Send Instant Notification to Admin (Socket IO) / Send Email (O)
            2. Checking Time Range / Edit
            3. Checking Doctors Authenticity (***) /check by Reg No
            4. Rating and feedback on the doctor (D)
            
#### Appointments ->
            1. Check the availability feature (D)
            2. Separate the appointments for doctor and user (D)
            3. Cancelling on both End (D)
            4. Approve appointment and send a zoom meeting link/approval notification to mail (D) and socket
            5. After meet send the prescription to patients mail as pdf
            6. Automatic Delete after the scheduled date/time

#### Profile ->
            1. User/ Doctor / admin -- 3 different profile (D)
            2. Upload Photo to cloud/ cloudinary (D)
            3. Update / Delete Profile by user/ADMIN (D)
            4. Add Doctors details including medical, passing year etc 
            5. Can upload his medical certificate as pdf/image (D)

#### Admin -> 
            1. Check doctors details and approve or delete (D)
            2. check doctors certificate/reg ss via online (D)
            

#### Payment Gateway
            1. After Payment Successful Appointment will be approved (D)
            2. SSLCommerze (Sandbox)/ (D)
            3. Stripe

#### Message/Notification
            1. Normal Notification (D)
            2. Real time (socket)
            3. Chat System (doctor, patient)