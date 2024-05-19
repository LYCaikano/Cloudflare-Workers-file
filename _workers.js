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

  generateHTML() {
    let html = '<!DOCTYPE html><html><head><title>成绩</title>';
    // 添加 CSS 样式
    html += '<style>';
    html += 'body { font-family: Arial, sans-serif; margin: 20px; font-size: 30px; }'; // 设置字体、边距和字体大小
    html += '.folder { margin-left: 45px; padding-left: 20px; border-left: 2px solid #ccc; margin-top: 10px; margin-bottom: 10px; }'; // 文件夹样式
    html += '.file { margin-left: 45px; margin-top: 10px; margin-bottom: 10px; }'; // 文件样式
    html += '.folder-name { cursor: pointer; font-weight: bold; }'; // 文件夹名称样式
    html += '.folder-contents { display: none; }'; // 文件夹内容默认隐藏
    html += '</style>';
    html += '</head><body>';
  
    // 递归生成文件夹和文件的HTML
    const generateFolderHTML = (folder, depth = 0) => {
      let folderHTML = '';
      // 文件夹的HTML
      folderHTML += `<div class="folder" style="margin-left: ${depth * 45}px;">`;
      folderHTML += `<div class="folder-name" onclick="toggleFolder('${folder.name}')" onmousedown="changeColor(this)" onmouseup="resetColor(this)">${folder.name}/</div>`;
      folderHTML += `<div class="folder-contents" id="${folder.name}">`;
      // 遍历文件夹内的内容
      folder.children.forEach(child => {
        if (child.type === 'folder') {
          folderHTML += generateFolderHTML(child, depth + 1); // 递归调用生成文件夹内容
        } else {
          folderHTML += `<div class="file"><a href="${child.link}">${child.name}</a></div>`;
        }
      });
      folderHTML += `</div></div>`;
      return folderHTML;
    };
  
    // 遍历根文件夹
    this.rootFolders.forEach(folder => {
      html += generateFolderHTML(folder);
    });
    // JavaScript 用于点击文件夹名称切换颜色
    html += `<script>
    function toggleFolder(name) {
      var element = document.getElementById(name);
      if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
    </script></body></html>`;

    html += `<script>
      function changeColor(element) {
        element.style.color = 'blue';
      }
  
      function resetColor(element) {
        element.style.color = '';
      }
    </script></body></html>`;
  
    return html;
  }  
}

// 创建文件夹结构
const folderStructure = new FolderStructure();
const bookFolder = folderStructure.addFolder('Book');//文件夹
const wgFolder = folderStructure.addFolder('十万个为什么20世纪60年代版', bookFolder);//book下的子文件夹
folderStructure.addFile('十万个为什么01.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么01.pdf', wgFolder);//wg下的文件
folderStructure.addFile('十万个为什么02.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么02.pdf', wgFolder);//
folderStructure.addFile('十万个为什么03.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么03.pdf', wgFolder);//
folderStructure.addFile('十万个为什么04.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么04.pdf', wgFolder);//
folderStructure.addFile('十万个为什么05.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么05.pdf', wgFolder);//
folderStructure.addFile('十万个为什么06.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么06.pdf', wgFolder);//
folderStructure.addFile('十万个为什么07.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么07.pdf', wgFolder);//
folderStructure.addFile('十万个为什么08.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么08.pdf', wgFolder);//
folderStructure.addFile('十万个为什么09.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么09.pdf', wgFolder);//
folderStructure.addFile('十万个为什么10.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么10.pdf', wgFolder);//
folderStructure.addFile('十万个为什么11.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么11.pdf', wgFolder);//
folderStructure.addFile('十万个为什么12.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么12.pdf', wgFolder);//
folderStructure.addFile('十万个为什么13.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么13.pdf', wgFolder);//
folderStructure.addFile('十万个为什么14.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么14.pdf', wgFolder);//
folderStructure.addFile('十万个为什么15.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么15.pdf', wgFolder);//
folderStructure.addFile('十万个为什么16.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么16.pdf', wgFolder);//
folderStructure.addFile('十万个为什么17.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么17.pdf', wgFolder);//
folderStructure.addFile('十万个为什么18.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么18.pdf', wgFolder);//
folderStructure.addFile('十万个为什么19.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么19.pdf', wgFolder);//
folderStructure.addFile('十万个为什么20.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么20.pdf', wgFolder);//
folderStructure.addFile('十万个为什么21.pdf', 'http://x99152qi.beget.tech/wp-content/uploads/2024/05/十万个为什么21.pdf', wgFolder);//
//以上为文件夹结构

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 生成HTML页面
  const html = folderStructure.generateHTML();
  // 返回HTML响应，确保设置字符编码为 UTF-8
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  })
}
