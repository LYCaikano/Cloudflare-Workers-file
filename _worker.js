class FolderStructure {
  constructor() {
    this.rootFolders = [];
  }

  addFolder(name, parentFolder = null) {
    const folder = { name, type: 'folder', children: [], parent: parentFolder };
    if (parentFolder) {
      parentFolder.children.push(folder);
    } else {
      this.rootFolders.push(folder);
    }
    return folder;
  }

  addFile(name, link, folder) {
    const file = { name, type: 'file', link };
    folder.children.push(file);
    return file;
  }

  generateHTML(folder) {
    let html = '<!DOCTYPE html><html><head><title>文件</title>';
    html += '<style>';
    html += 'body { font-family: Arial, sans-serif; margin: 20px; font-size: 16px; }';
    html += '.folder { margin-left: 20px; margin-top: 5px; margin-bottom: 5px; border: 1px solid #ccc; padding: 5px; }';
    html += '.file { margin-left: 20px; margin-top: 5px; margin-bottom: 5px; }';
    html += '.folder-name { cursor: pointer; font-weight: bold; }';
    html += '.folder-contents { display: none; }';
    html += '</style>';
    html += '</head><body>';

    // const path = this.getPath(folder);
    // html += `<div>Path: ${path}</div>`;

    const generateFolderHTML = (folder, depth = 0) => {
      let folderHTML = '';
      folderHTML += `<div class="folder" style="margin-left: ${depth * 20}px;">`;
      folderHTML += `<div class="folder-name" onclick="toggleFolder('${folder.name}')" onmouseover="changeColor(this)" onmouseout="resetColor(this)">${folder.name}</div>`;
      folderHTML += `<div class="folder-contents" id="${folder.name}">`;
      folder.children.forEach(child => {
        if (child.type === 'folder') {
          folderHTML += generateFolderHTML(child, depth + 1);
        } else {
          folderHTML += `<div class="file"><a href="${child.link}">${child.name}</a></div>`;
        }
      });
      folderHTML += `</div></div>`;
      return folderHTML;
    };

    html += generateFolderHTML(folder);

    html += `<script>
      function toggleFolder(name) {
        var element = document.getElementById(name);
        if (element.style.display === "none" || element.style.display === "") {
          element.style.display = "block";
        } else {
          element.style.display = "none";
          collapseSubfolders(element);
        }
      }
      
      function collapseSubfolders(folderElement) {
        var subfolders = folderElement.getElementsByClassName('folder-contents');
        for (var i = 0; i < subfolders.length; i++) {
          subfolders[i].style.display = "none";
        }
      }

      function changeColor(element) {
        element.style.color = 'blue';
      }
  
      function resetColor(element) {
        element.style.color = '';
      }
    </script></body></html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  }

  getPath(folder) {
    let path = "";
    while (folder) {
      path = `/${folder.name}${path}`;
      folder = folder.parent;
    }
    return path;
  }
}

const folderStructure = new FolderStructure();
const rootF = folderStructure.addFolder('root');
const bookFolder = folderStructure.addFolder('Book', rootF);
const wgFolder = folderStructure.addFolder('十万个为什么wg版', bookFolder);
const musicFolder = folderStructure.addFolder('Music', rootF);
const jayFolder = folderStructure.addFolder('周杰伦', musicFolder);
folderStructure.addFile('十万个为什么01.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么01.pdf', wgFolder);//wg下的文件
folderStructure.addFile('晴天.mp3', 'http://x99152qi.beget.tech/wp-content/uploads/2024/06/周杰伦-晴天.mp3', jayFolder);
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const folderName = url.searchParams.get('folder');

  let folder = null;
  if (folderName) {
    folder = findFolder(folderStructure.rootFolders, folderName);
  } else {
    folder = folderStructure.rootFolders[0];
  }

  const html = folderStructure.generateHTML(folder);
  return html;
}

function findFolder(folders, name) {
  for (const folder of folders) {
    if (folder.name === name) {
      return folder;
    }
    if (folder.children.length > 0) {
      const found = findFolder(folder.children, name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
