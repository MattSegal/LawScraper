from __future__ import print_function
import os
import boto3
"""
Run this after `npm build`
"""
from io import BytesIO
import gzip
import shutil

bucket = boto3.resource('s3').Bucket('lawscraper.xyz')


def get_content_type(filename):
    extension = filename.split('.')[-1]
    content_types = {
        'html': 'text/html',
        'css': 'text/css',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'ico': 'image/x-icon',
        'js': 'application/javascript',
        'json': 'application/json'
    }
    return content_types.get(extension, 'text/plain')


def upload(path='build/'):
    files = (
        os.path.join(path, node) for node in os.listdir(path)
        if os.path.isfile(os.path.join(path, node)) and
        '.map' not in node # don't need 'em
    )
    
    folders = (
        os.path.join(path, node) for node in os.listdir(path)
        if os.path.isdir(os.path.join(path, node))
    )

    for folder in folders:
        upload(folder)

    for filename in files:
        with open(filename, 'r') as f:
            content_type = get_content_type(filename)
            print('uploading {} as {}... '.format(filename, content_type), end='')
            f_compressed = BytesIO()
            with gzip.GzipFile(fileobj=f_compressed, mode='wb') as gz:
                shutil.copyfileobj(f, gz)
            f_compressed.seek(0)
            key = filename.replace('build/', '').replace('\\', '/')
            bucket.upload_fileobj(f_compressed, key, {
                'ContentType': content_type, 
                'ContentEncoding': 'gzip',
                'ACL': 'public-read'
            })
            print('done')

if __name__ == '__main__':
    upload()