IL_SENT = "initial contact";
var GOT_CONTACT = "got contact"

function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 100;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 7)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var name = row[0];     
    var firstName = name.split(" ")[0];       
    var status = row[3];       
    var company = row[4];     
    var title = row[5];
    var email = row[6];
    var testEmail = "abdullah.bakhach+"+firstName+"@gmail.com";
    
    if (status == GOT_CONTACT && email !=null) {  // Prevents sending duplicates
      var subject = "Technical Product Manager Vacancy in Beirut for an International Startup";
      var message = "Hey "+firstName+",<br><br>"
      message +="My name is Abdullah, responsible for scaling the engineering team at "
      message +="<a href='http://www.servmeco.com/'>SerVme</a> in Beirut. I saw your profile on Linkedin and was interested in your"
      message +=" experience at "+company+" as a "+title+".<br><br>We have a talented team of seven engineers"
      message +=" who are working on our flagship product that offers B2B restaurant management solutions"
      message +=" via iOS, Android and a Web App, with a lot of heavy lifting in the backend.<br><br>"
      message +="We are looking for a talented team leader like yourself to lead this team. "
      message +="Please let me know if you are interested!"
      message +="<br><br>"
      message +="<b>Abdullah Bakhach</b><br>"
      message +="Founder, <a href='http://lobolabshq.com/'>Lobo Labs</a><br>"  
      message +="<a href='https://stackoverflow.com/users/766570/abbood?tab=profile'>StackOverflow</a><br>"
      message +="<a href='https://www.linkedin.com/in/abdullahbakhach/'>Linkedin</a><br>"

      MailApp.sendEmail(email, subject,'sample body', {
        htmlBody: message
      });
      sheet.getRange(startRow + i, 4).setValue(EMAIL_SENT);
      Logger.log("successfully sent email to: "+name+" at email: "+email);
      // Make sure the cell is updated right away in case the script is interrupted
      
      SpreadsheetApp.flush();
    }
  }
}

function onEdit(e) {
    updateStatusOnContact(e);  
}

function updateStatusOnContact(e) {
    Logger.clear();
    Logger.log("hello");  
    var SHEET_NAME = 'details - batch 2';
    var CONTACT_COLUMN_INDEX = 7;
    var STATUS_COLUMN_INDEX = 4;
    var range = e.range;
    var INITIAL_STATUS = "requested contact";
    var FINAL_STATUS = "got contact";
    Logger.log("about to run check");    
    var activeSheet = e.source.getActiveSheet();
    var status = activeSheet.getRange(e.range.rowStart, STATUS_COLUMN_INDEX).getValue();
 
 

  
  Logger.log("activeSheet.getName: '" + activeSheet.getName() +"', range.getcolumn: '"+range.getColumn() + "', status: '"+status+"'");  
   
  if (activeSheet.getName() !== SHEET_NAME || range.getColumn() !== CONTACT_COLUMN_INDEX || status !== INITIAL_STATUS) {
        Logger.log("check failed");
        return;
  }  
    
    activeSheet.getRange(e.range.rowStart, STATUS_COLUMN_INDEX).setValue(FINAL_STATUS);
  
}


