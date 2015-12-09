(function() {
    var app = angular.module('propTranslate', ["pascalprecht.translate"], function() {
    });

    app.config(function($translateProvider) {

        $translateProvider.translations("en", {


            //Cancel Modal
            VERIFY_MODAL_H4: "Cancel Validation",
            VERIFY_MODAL_TEXT: "Are you sure you want to cancel the current Patient Validation?",
            VERIFY_MODAL_NO: "No",
            VERIFY_MODAL_YES: "Yes",
            DIALOGS_OK : "OK",
            DIALOGS_CLOSE : "CLOSE"
        });

        $translateProvider.preferredLanguage("en");

    });

})() ;
