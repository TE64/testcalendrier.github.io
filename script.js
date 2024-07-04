$(document).ready(function() {
    // Charger les événements existants depuis le fichier JSON
    $.getJSON('events.json', function(events) {
      // Initialiser FullCalendar
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: events // Charger les événements depuis le fichier JSON
      });
  
      // Afficher le calendrier
      calendar.render();
    });
  
    // Soumettre le formulaire pour ajouter un nouvel événement
    $('#eventForm').submit(function(e) {
      e.preventDefault();
  
      // Récupérer les valeurs du formulaire
      let startDate = $('#startDate').val();
      let endDate = $('#endDate').val();
      let chefChantier = $('#chefChantier').val();
      let commune = $('#commune').val();
      let numArmoire = $('#numArmoire').val();
      let natureTravaux = $('#natureTravaux').val();
      let entreprise = $('#entreprise').val();
  
      // Créer un nouvel événement
      let newEvent = {
        title: natureTravaux,
        start: startDate,
        end: endDate,
        chefChantier: chefChantier,
        commune: commune,
        numArmoire: numArmoire,
        entreprise: entreprise
      };
  
      // Charger les événements existants depuis le fichier JSON
      $.getJSON('events.json', function(events) {
        // Ajouter le nouvel événement à la liste
        events.push(newEvent);
  
        // Mettre à jour le fichier JSON avec les nouveaux événements
        $.ajax({
          type: 'POST',
          url: 'save_events.php', // URL pour sauvegarder les événements (ou utiliser GitHub API pour les mises à jour)
          data: JSON.stringify(events),
          contentType: 'application/json',
          success: function() {
            // Recharger les événements dans FullCalendar
            calendar.addEvent(newEvent);
            // Réinitialiser le formulaire
            $('#eventForm')[0].reset();
          },
          error: function() {
            alert('Erreur lors de la sauvegarde des événements.');
          }
        });
      });
    });
  });