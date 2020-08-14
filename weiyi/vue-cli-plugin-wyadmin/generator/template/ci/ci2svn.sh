project_name="<%= gitlabProjectName %>"
#如需定制URL path，打开该注释
#url_location_key=${project_name}

#上一步构建脚本的输出文件夹，通常为"dist"或"build/dist"
output_dir="dist"

#checkout 工作目录
if [ ! -d ${project_name} ]
then
  svn co svn://p1.winbaoxian.cn/wy/h5/${project_name}
fi

if [[ -n $url_location_key ]] && [[ ! -d ${project_name}/${url_location_key} ]]
then
  mkdir ${project_name}/${url_location_key}
fi

#更新工作目录
cd ${project_name}/ && svn update --force

#拷贝输出文件
if [[ -n $url_location_key ]]
then
#svn delete ./${url_location_key}/*
cp -rf ../${output_dir}/* ./${url_location_key}/
else
#svn delete ./*
cp -rf ../${output_dir}/* ./
fi

#提交到svn 仓库
svn add --force  *
svn ci -m "Jenkins upload ${project_name} %BUILD_NUMBER%"
