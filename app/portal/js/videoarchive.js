var timeline;

function createTimeline(curNodeId, locale, startDate, endDate) {
  var $vid = $('#video1');
  // var refreshInterval;

  var videos = [];
  var items = [];

  parseData(startDate, endDate).then(() => {
    if (timeline) timeline.destroy();
    // if (refreshInterval) clearInterval(refreshInterval);
    // if (!history) {
    //   $vid.find('source').attr('src', null);
    //   $vid.get(0).load();
    // }
    // refreshInterval = setInterval(parseData, 60000);
    let container = document.getElementById('timeslider');
    let dataSet = new vis.DataSet(items);
    // let start;
    // if (items.length > 0) {
    //   start = new Date(items[0].start);
    // } else {
    //   start = new Date();
    // }
    // start.setHours(0, 0, 0, 0);
    // let end = new Date();
    // end.setHours(23, 59, 59, 999);
    let options = {
      width: '98.75%',
      maxHeight: '100px',
      minHeight: '100px',
      stack: false,
      max: endDate,
      min: startDate,
      locale: locale.substring(0, 2)
    };

    timeline = new vis.Timeline(container, dataSet, options);

    timeline.on('click', (properties) => {
      if (properties.item) {
        let url = videos.find(x => x.filename == properties.item).url;
        $vid.find('source').attr('src', url);
        $vid.get(0).load();
        $vid.get(0).pause();
      }
    });
  });

  function parseData(startDate, endDate) {
    return new Promise((resolve, reject) => {
      let _items = [];
      let _videos = [];
      //let params = {
      let query = {
          sourceId: curNodeId,
          date: {
            '$gt' : startDate, 
            '$lt' : endDate
          }
        }
      //};
      // params.query = {};
      // params.query.sourceId = curNodeId
      // params.query.date = { '$gt' : startDate, '$lt' : endDate };
      $.getJSON('/api/v1/Video?query=' + JSON.stringify(query), (vids) => {
        _videos = vids;
        _videos.forEach((video) => {
          _items.push({
              id: video.filename,
              start: video.start,
              end: video.end,
              content: ''
            });
          video.url = document.location.origin + '/videos/' + curNodeId + '/' + video.filename;
        });
      }).done(() => {
      // if (items.length > 0) {
      //   let added = _items.filter(comparer(items));
      //   let removed = items.filter(comparer(_items));
      //   console.log(added, removed, curNodeId)
      //   if (added) {
      //     $.each(added, (index, value) => {
      //       timeline.itemsData.getDataSet().add(value);
      //     });
      //   }
      //   if (removed) {
      //     $.each(removed, (index, value) => {
      //       timeline.itemsData.getDataSet().remove(value);
      //     });
      //   }
      //  }
       videos = _videos;
       items = _items.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
       resolve();
      }).fail(() => {       
        _items = [];
        _videos = [];
        resolve()
      });
    });
  }

  // function comparer(otherArray) {
  //   return function (current) {
  //     return otherArray.filter((other) => {
  //       return other.id == current.id
  //     }).length == 0;
  //   }
  // }
}

$('#historyTbl').on('click-cell.bs.table', (field, value, row, $e) => {
  if (value == 'date' && $e.video) {
    $('.nav-tabs a[href="#videoArchive"]').tab('show');
    $('#videoSourceSelector').selectpicker('val', $e.sourceId);
    $('#video1').find('source').attr('src', document.location.origin + '/videos/' + $e.sourceId + '/' + $e.video);
    $('#video1').get(0).load();
    $('#video1').get(0).currentTime = Math.round($e.diff / 1000 - 5);
    $('#video1').get(0).pause();

    let focusInterval = setInterval(function () {
      if (timeline) {
        timeline.setSelection($e.video, {
          focus: true
        });
        clearInterval(focusInterval)
      }
    }, 1000);
  }
});
