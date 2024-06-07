// 文件夹结构的类
class FolderStructure {
  constructor() {
    this.rootFolders = []; // 初始化根文件夹数组
  }

  // 添加文件夹
  addFolder(name, parentFolder = null) {
    // 创建文件夹对象
    const folder = { name, type: 'folder', children: [], parent: parentFolder };
    // 如果有父文件夹，将新文件夹添加到父文件夹下
    if (parentFolder) {
      parentFolder.children.push(folder);
    } else {
      // 否则将新文件夹添加到根文件夹数组中
      this.rootFolders.push(folder);
    }
    return folder; 
  }

  // 添加文件
  addFile(name, link, folder) {
    // 创建一个文件对象
    const file = { name, type: 'file', link };
    // 将文件添加到指定文件夹的子文件数组中
    folder.children.push(file);
    return file; 
  }

  // 生成HTML
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

    // 递归生成文件夹
    const generateFolderHTML = (folder, depth = 0) => {
      let folderHTML = '';
      // 调整文件夹左边距
      folderHTML += `<div class="folder" style="margin-left: ${depth * 20}px;">`;
      // 点击文件夹时调用toggleFolder函数展开或折叠文件夹，鼠标悬停时调用changeColor和resetColor函数实现鼠标悬停效果
      folderHTML += `<div class="folder-name" onclick="toggleFolder('${folder.name}')" onmouseover="changeColor(this)" onmouseout="resetColor(this)">${folder.name}</div>`;
      folderHTML += `<div class="folder-contents" id="${folder.name}">`;
      // 遍历文件夹
      folder.children.forEach(child => {
        if (child.type === 'folder') {
          // 如果是文件夹，则递归生成其内容
          folderHTML += generateFolderHTML(child, depth + 1);
        } else {
          // 生成文件的HTML
          folderHTML += `<div class="file"><a href="${child.link}">${child.name}</a></div>`;
        }
      });
      folderHTML += `</div></div>`;
      return folderHTML;
    };

    // 生成根文件夹的HTML
    html += generateFolderHTML(folder);

    // 添加JavaScript代码，用于文件夹展开/折叠和鼠标悬停效果
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

    // 返回生成的HTML响应，支持中字
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  }
}

// 创建文件夹结构实例
const folderStructure = new FolderStructure();
const rootF = folderStructure.addFolder('root'); // 添加根文件夹
const bookFolder = folderStructure.addFolder('Book', rootF); // 在根文件夹下添加Book文件夹
const wgFolder = folderStructure.addFolder('十万个为什么wg版', bookFolder); // 在Book文件夹下添加子文件夹
const musicFolder = folderStructure.addFolder('Music', rootF); // 在根文件夹下添加Music文件夹
const jayFolder = folderStructure.addFolder('周杰伦', musicFolder); // 在Music文件夹下添加子文件夹
folderStructure.addFile('十万个为什么01.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么01.pdf', wgFolder); // 在十万个为什么wg版文件夹下添加文件
folderStructure.addFile('晴天.mp3', 'http://x99152qi.beget.tech/wp-content/uploads/2024/06/周杰伦-晴天.mp3', jayFolder); // 在周杰伦文件夹下添加文件

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

// 处理传入请求
async function handleRequest(request) {
  const url = new URL(request.url);
  const folderName = url.searchParams.get('folder'); // 获取请求URL中的folder参数

  let folder = null;
  if (folderName) {
    // 如果提供了文件夹名称，则查找对应的文件夹
    folder = findFolder(folderStructure.rootFolders, folderName);
    if (!folder) {
      return new Response('Folder not found', { status: 404 }); // 未找到文件夹返回404错误
    }
  } else {
    // 如果没有提供文件夹名称，则使用根文件夹
    folder = folderStructure.rootFolders[0];
  }
  const html = folderStructure.generateHTML(folder); // 生成文件夹的HTML
  return html; 
}

// 在文件夹树中递归查找指定名称的文件夹
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
  return new Response('Folder not found', { status: 404 }); 
}
