PennController.ResetPrefix(null); // Initiates PennController
//PennController.DebugOff();
//PennController.AddHost("https://filedn.com/lH9cUW1CPJs0WcMcH0isJAJ/"); // loads pictures from external server (pre-test 3 only)

//PennController.Sequence( "demographics","post_questionaire",  "send", "final");
PennController.Sequence("demographics","instructions", "practice_trials", "critical_trials", "post_questionaire", "send", "final");


//====================================================================================================================================================================================================================
// 1. Welcome page
PennController("demographics",
               // ENTER PROLIFIC ID
               newText("welcometext", "<p><b>Welcome to our experiment!</b><p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
               .print()
               ,
               newTextInput("proID", "")
               .before(newText("proID", "Before we begin, please enter your Prolific ID: ")
                       .settings.css("font-size", "20px"))
               .size(100, 20)
               .settings.center()
               .print()
               ,
               newText("blank","<p>")
               .print()
               ,
               newButton("cont", "Continue")
               .settings.center()
               .print()
               .wait(getTextInput("proID")
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror","<p>Please enter your Prolific ID in order to continue.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                     ))
               ,  
               getCanvas("welcomecanvas")
               .remove()
               ,
               getTextInput("proID")
               .remove()
               ,
               getButton("cont")
               .remove()
               ,
               getText("IDerror")
               .remove()
               ,
               
               //====================================================================================================================================================================================================================
               // Intro/instructions
               
               newText("intro_instructions", "<p><b>Thank you for taking part in our experiment!</b><p><br><p>This experiment investigates how people process linguistic information. You will first see a picture followed by a sentence describing the situation depicted. Afterwards, you will be presented with a guess about what’s going to happen and in the final picture you will learn what actually happened. <b>Your task will be to judge whether the guess was right by clicking 'yes' or 'no' button</b>.<br> <p>The experiment will start with two practice rounds. It should take approximately 5-10 minutes. At the end you will receive a code which you should copy into Prolific in order to receive your payment. You may only participate and be compensated once.<p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("introcanvas",1000, 250)
               .settings.add(0,-100, getText("intro_instructions"))
               .print()   
               ,
               
               //====================================================================================================================================================================================================================
               // ENTER DEMOGRAPHICS
               
               newText("instr_demo", "<p>Before you begin the experiment, please provide some basic information about yourself.*<p> <p><b>*Note that your confidentiality will be maintained.</b> Prolific provides no personal information to the requester. Your data will be stored in anonymous form. The results of this research study may be presented at meetings or in publications. The data can be made accessible to other academic non-profit researchers that investigate language or language use on request.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("democanvas", 1000, 130)
               .settings.add(0, 0, getText("instr_demo") )
               .print()
               ,
               newTextInput("native_languages", "")
               .size(300, 20)
               ,
               newText("native_lang", "<p>What was(were) the language(s) spoken at home when you were a child?<p>")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newCanvas("nativlangcanvas", 1000, 75)
               .settings.add(0, 10, getText("native_lang") )
               .settings.add(660, 30, getTextInput("native_languages") )
               .print()
               ,
               newText("other_lang", "Do you currently speak other languages on a regular basis?")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newTextInput("in_particular", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("in_particular") )
               ,
               newDropDown("other_languages", "")
               .settings.log()
               .settings.add(  "no", "yes, I also speak:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("other_languages")
                   .test.selected("yes, I also speak:")                             //reveal the input box
                   .success( getTextInput("in_particular").settings.visible() )     //hide the input box
                   .failure( getTextInput("in_particular").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("other_lang") )
               .settings.add(660, 2, getDropDown("other_languages") )
               .print()
               ,
               newText("<p> ")
               .print()
               ,    
               
               newText("consent_button", "<p>By clicking 'I consent' button, you agree to the following: <br><p> <b>1.</b> I am 18 years old or older. <br> <b>2.</b>  I have read the above information, I understand it, and I agree to it. <br> <b>3.</b>  I wish to participate in the experiment. <p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvasthree", 1000, 155)
               .settings.add(0, 0, getText("consent_button") )
               .print()
               ,
               newButton("consent", "I consent")
               .settings.css("font-size", "15px")        
               .print()
               .wait()  
               ,
               newButton("start", "Start the practice")
               .print()
               .wait(getTextInput("native_languages") 
                     .test.text(/[^\s]+/)  // this makes sure that it's not left blank
                     .success()
                     .failure(
                         newText("IDerror1","<p>Please answer the question about your language history.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                         ,
                         getDropDown("other_languages")
                         .test.selected()
                         .success()
                         .failure(
                             newText("IDerror2","<p>Please answer the question about other languages you curently speak.")
                             .settings.color("red")
                             .settings.center()
                             .print()
                             
                             
                         )))
               
               ,
               newVar("proID")
               .settings.global()
               .set( getTextInput("proID") )
               ,
               newVar("IDnatlang")
               .settings.global()
               .set( getTextInput("native_languages") )
               ,
               newVar("IDotherlang")
               .settings.global()
               .set( getDropDown("other_languages") )
               ,
               newVar("IDin_particular")
               .settings.global()
               .set( getTextInput("in_particular") )
               
              )                                 //end of welcome screen
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("item", "demo")
    .log("name", "demo")
    .log("sentence_intro", "demo")
    .log("sentence_guess1", "demo")
    .log("sentence_guess2", "demo")
    .log("sentence_outcome1", "demo")
    .log("sentence_outcome2", "demo")
    .log("question", "demo")
    .log("disjunction_type", "demo")
    .log("condition", "demo")
    .log("type", "demo")
    .log("file_name_intro", "demo")
    .log("file_name_guess", "demo")
    .log("file_name_outcome", "demo")
    .log("imgur_intro", "demo")
    .log("imgur_guess", "demo")
    .log("imgur_outcome", "demo")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Practice trials
PennController.Template( PennController.GetTable( "list1.csv")// change this line for the appropriate experimental list
                         .filter("type" , "practice"),  
                         variable => PennController( "practice_trials",
                                                      newText("pleasewait", "...")
                                                      .settings.css("font-size", "25px")
                                                      .settings.center()
                                                      .settings.bold()
                                                      .print()
                                                      ,
                                                      newTimer("wait", 1000)
                                                      .start()
                                                      .wait()
                                                      ,
                                                      getText("pleasewait")
                                                      .remove()
                                                      ,
                                                      newImage("image_intro",variable.imgur_intro)
                                                      .settings.size(400)
                                                      ,
                                                      newImage("image_guess", variable.imgur_guess)
                                                      .settings.size(400)
                                                      .settings.hidden()
                                                      ,
                                                      newImage("image_outcome",variable.imgur_outcome)
                                                      .settings.size(400)
                                                      .settings.hidden()
                                                      ,
                                                      newText("sentence_intro","<p>"+variable.sentence_intro)
                                                      .settings.css("font-size", "20px")
                                                      ,
                                                      newText("sentence_guess", "<p>"+variable.sentence_guess1+"<br>"+variable.sentence_guess2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newText("sentence_outcome", "<p>"+variable.sentence_outcome1+"<br>"+variable.sentence_outcome2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newCanvas("canvas",1250,410 )
                                                      .settings.add( "left at 3%", "middle at 50%", getImage("image_intro"))
                                                      .settings.add( "center at 53%", "middle at 50%", getImage("image_guess"))
                                                      .settings.add( "right at 103%", "middle at 50%", getImage("image_outcome") )
                                                      .print()
                                                      ,
                                                      
                                                      newCanvas("canvas2",1300,100 )
                                                      .settings.add( 40, 0,newCanvas(400,10)
                                                                     .settings.add( 0,0, getText("sentence_intro")))
                                                      .settings.add(470, 0 ,newCanvas(400,10)
                                                                    .settings.add( 0,0, getText("sentence_guess")))
                                                      .settings.add(900, 0 ,newCanvas(400,10)
                                                                    .settings.add(0,0, getText("sentence_outcome")))
                                                      .print()
                                                      
                                                      ,
                                                      newButton("next_guess", "Next")
                                                      .settings.center()
                                                      .settings.css("font-size", "15px")
                                                      .print()
                                                      .wait()
                                                      
                                                      ,
                                                      getImage("image_guess")
                                                      .visible()
                                                      ,
                                                      getText("sentence_guess")
                                                      .visible()
                                                      ,
                                                      getButton("next_guess")
                                                      .remove()
                                                      ,
                                                      newButton("next_outcome", "Next")
                                                      .settings.center()
                                                      .settings.css("font-size", "15px")
                                                      .print()
                                                      .wait()
                                                      ,
                                                      getImage("image_outcome")
                                                      .visible()
                                                      ,
                                                      getText("sentence_outcome")
                                                      .visible()
                                                      ,
                                                      
                                                      getButton("next_outcome").remove()
                                                      ,
                                                      newText("sent_scale", "<p><b>Was the guess right?</b><p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .print()
                                                      ,
                                                      newScale("question", "YES",   "NO")
                                                      .radio()
                                                      .labelsPosition("right")
                                                      .settings.center()
                                                      .settings.css("font-size", "20px")
                                                      .log("last")
                                                      .print()
                                                      .wait()
                                                      ,
                                                      newText("<p>")
                                                      .print()
                                                      ,
                                                      newButton("validation", "Validate")
                                                      .settings.css("font-size", "15px")
                                                      .settings.center()
                                                      .print()
                                                      .wait()
                                                      ,
                                                      getCanvas("canvas").remove()
                                                      ,
                                                      getCanvas("canvas2").remove()
                                                      ,
                                                      getScale("question").remove()
                                                      ,
                                                      getText("sent_scale"). remove()
                                                      ,
                                                      getButton("validation") .remove()
                                                      
                                                      
                                                     )
                          
                          .log("prolificID", getVar("proID"))
                          .log("nat_lang", getVar("IDnatlang"))
                          .log("other_lang", getVar("IDotherlang"))
                          .log("which_other", getVar("IDin_particular"))
                          .log("item", variable.item)
                          .log("name", variable.name)
                          .log("sentence_intro", variable.sentence_intro)
                          .log("sentence_guess1", variable.sentence_guess1)
                          .log("sentence_guess2", variable.sentence_guess2)
                          .log("sentence_outcome1", variable.sentence_outcome1)
                          .log("sentence_outcome2", variable.sentence_outcome2)
                          .log("question", variable.question)
                          .log("disjunction_type", variable.disjunction_type)
                          .log("condition", variable.condition)
                          .log("type", variable.type)
                          .log("file_name_intro", variable.file_name_intro)
                          .log("file_name_guess", variable.file_name_guess)
                          .log("file_name_outcome", variable.file_name_outcome)
                          .log("imgur_intro", variable.imgur_intro)
                          .log("imgur_guess", variable.imgur_guess)
                          .log("imgur_outcome", variable.imgur_outcome)
                          
                          
                         ); 
//====================================================================================================================================================================================================================
// 4. Experimental trials
PennController.Template( PennController.GetTable( "list1.csv")// change this line for the appropriate experimental list
                         .filter("type" , "target"),  
                         variable => PennController( "critical_trials",
                                                      newText("pleasewait", "...")
                                                      .settings.css("font-size", "25px")
                                                      .settings.center()
                                                      .settings.bold()
                                                      .print()
                                                      ,
                                                      newTimer("wait", 1000)
                                                      .start()
                                                      .wait()
                                                      ,
                                                      getText("pleasewait")
                                                      .remove()
                                                      ,
                                                      newImage("image_intro",variable.imgur_intro)
                                                      .settings.size(400)
                                                      ,
                                                      newImage("image_guess", variable.imgur_guess)
                                                      .settings.size(400)
                                                      .settings.hidden()
                                                      ,
                                                      newImage("image_outcome",variable.imgur_outcome)
                                                      .settings.size(400)
                                                      .settings.hidden()
                                                      ,
                                                      newText("sentence_intro","<p>"+variable.sentence_intro)
                                                      .settings.css("font-size", "20px")
                                                      ,
                                                      newText("sentence_guess", "<p>"+variable.sentence_guess1+"<br>"+variable.sentence_guess2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newText("sentence_outcome", "<p>"+variable.sentence_outcome1+"<br>"+variable.sentence_outcome2)
                                                      .settings.css("font-size", "20px")
                                                      .settings.hidden()
                                                      ,
                                                      newCanvas("canvas",1250,410 )
                                                      .settings.add( "left at 3%", "middle at 50%", getImage("image_intro"))
                                                      .settings.add( "center at 53%", "middle at 50%", getImage("image_guess"))
                                                      .settings.add( "right at 103%", "middle at 50%", getImage("image_outcome") )
                                                      .print()
                                                      ,
                                                      
                                                      newCanvas("canvas2",1300,100 )
                                                      .settings.add( 40, 0,newCanvas(400,10)
                                                                     .settings.add( 0,0, getText("sentence_intro")))
                                                      .settings.add(470, 0 ,newCanvas(400,10)
                                                                    .settings.add( 0,0, getText("sentence_guess")))
                                                      .settings.add(900, 0 ,newCanvas(400,10)
                                                                    .settings.add(0,0, getText("sentence_outcome")))
                                                      .print()
                                                      
                                                      ,
                                                      newButton("next_guess", "Next")
                                                      .settings.center()
                                                      .settings.css("font-size", "15px")
                                                      .print()
                                                      .wait()
                                                      
                                                      ,
                                                      getImage("image_guess")
                                                      .visible()
                                                      ,
                                                      getText("sentence_guess")
                                                      .visible()
                                                      ,
                                                      getButton("next_guess")
                                                      .remove()
                                                      ,
                                                      newButton("next_outcome", "Next")
                                                      .settings.center()
                                                      .settings.css("font-size", "15px")
                                                      .print()
                                                      .wait()
                                                      ,
                                                      getImage("image_outcome")
                                                      .visible()
                                                      ,
                                                      getText("sentence_outcome")
                                                      .visible()
                                                      ,
                                                      
                                                      getButton("next_outcome").remove()
                                                      ,
                                                      newText("sent_scale", "<p><b>Was the guess right?</b><p>")
                                                      .settings.css("font-size", "20px")
                                                      .settings.center()
                                                      .print()
                                                      ,
                                                      newScale("question", "YES",   "NO")
                                                      .radio()
                                                      .labelsPosition("right")
                                                      .settings.center()
                                                      .settings.css("font-size", "20px")
                                                      .log("last")
                                                      .print()
                                                      .wait()
                                                      ,
                                                      newText("<p>")
                                                      .print()
                                                      ,
                                                      newButton("validation", "Validate")
                                                      .settings.css("font-size", "15px")
                                                      .settings.center()
                                                      .print()
                                                      .wait()
                                                      ,
                                                      getCanvas("canvas").remove()
                                                      ,
                                                      getCanvas("canvas2").remove()
                                                      ,
                                                      getScale("question").remove()
                                                      ,
                                                      getText("sent_scale"). remove()
                                                      ,
                                                      getButton("validation") .remove()
                                                      
                                                      
                                                     )
                          
                          .log("prolificID", getVar("proID"))
                          .log("nat_lang", getVar("IDnatlang"))
                          .log("other_lang", getVar("IDotherlang"))
                          .log("which_other", getVar("IDin_particular"))
                          .log("item", variable.item)
                          .log("name", variable.name)
                          .log("sentence_intro", variable.sentence_intro)
                          .log("sentence_guess1", variable.sentence_guess1)
                          .log("sentence_guess2", variable.sentence_guess2)
                          .log("sentence_outcome1", variable.sentence_outcome1)
                          .log("sentence_outcome2", variable.sentence_outcome2)
                          .log("question", variable.question)
                          .log("disjunction_type", variable.disjunction_type)
                          .log("condition", variable.condition)
                          .log("type", variable.type)
                          .log("file_name_intro", variable.file_name_intro)
                          .log("file_name_guess", variable.file_name_guess)
                          .log("file_name_outcome", variable.file_name_outcome)
                          .log("imgur_intro", variable.imgur_intro)
                          .log("imgur_guess", variable.imgur_guess)
                          .log("imgur_outcome", variable.imgur_outcome)
                          
                          
                         ); 

//====================================================================================================================================================================================================================
// 5. Post questionaire

PennController( "post_questionaire" ,
                newText("post_instructions", "<p>We welcome your feedback on this experiment!<p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("postcanvas",900, 80)
                .settings.add(0,0, getText("post_instructions"))
                .print()   
                ,
                newText("text_scale", "<p> Did you read the instructions and do you think you did the experiment correctly?<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newScale("question", "Yes",   "No", "I was confused")
                .radio()
                .labelsPosition("right")
                .settings.css("font-size", "20px")
                .log("last")
                ,
                newCanvas("scalecanvas",900, 130)
                .settings.add(0,0, getText("text_scale"))
                .settings.add(0,70, getScale("question"))
                .print()
                ,
                newTextInput("exp_investigated", "")
                .size(700, 40)
                .log()
                ,
                newText("exptext", "What do you think this experiment was investigating?")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("expcanvas", 1000, 85)
                .settings.add(0, 0, getText("exptext") )
                .settings.add(0, 30, getTextInput("exp_investigated") )
                .print()
                ,
                newTextInput("suggestions", "")
                .size(700, 40)
                .log()
                ,
                newText("suggesttext", "Do you have any suggestions for us? We are interested in any comments you may have.")
                .settings.css("font-size", "20px")    
                ,
                newCanvas("suggestcanvas", 1000, 75)
                .settings.add(0, 10, getText("suggesttext") )
                .settings.add(0, 40, getTextInput("suggestions") )
                .print()
                ,
                newTextInput("age", "")
                .size(120, 20)
                ,
                newText("agetext", "What is your age?")
                .settings.css("font-size", "20px")
                .log()    
                ,
                newCanvas("agecanvas", 1000, 85)
                .settings.add(0, 30, getText("agetext") )
                .settings.add(160, 32, getTextInput("age") )
                .print()
                ,
                newButton("finish", "Finish the experiment")
                .settings.css("font-size", "15px")
                .print()
                .wait()
               )
    
    .log("prolificID", getVar("proID"))
    .log("nat_lang", getVar("IDnatlang"))
    .log("other_lang", getVar("IDotherlang"))
    .log("which_other", getVar("IDin_particular"))
    .log("item", "post")
    .log("name", "post")
    .log("sentence_intro", "post")
    .log("sentence_guess1", "post")
    .log("sentence_guess2", "post")
    .log("sentence_outcome1", "post")
    .log("sentence_outcome2", "post")
    .log("question", "post")
    .log("disjunction_type", "post")
    .log("condition", "post")
    .log("type", "post")
    .log("file_name_intro", "post")
    .log("file_name_guess", "post")
    .log("file_name_outcome", "post")
    .log("imgur_intro", "post")
    .log("imgur_guess", "post")
    .log("imgur_outcome", "post")
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//====================================================================================================================================================================================================================
// 10. Send results

PennController.SendResults( "send" )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 11. Good-bye

PennController( "final",
                newText("final_text","<p><b>Thank you for your participation!</b><p><br><p>This is your Validation Code: <b>XX</b>. Please enter this code into XX in order to receive your payment.<p><br> <p>All data and information that we collect in this experiment are treated confidentially and used only for scientific purposes.<p> <p>If you have any questions about this study please contact us at <b>cross.conn.dfg@gmail.com</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                newButton("void")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

