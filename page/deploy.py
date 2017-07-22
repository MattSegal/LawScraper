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

DO_NOT_COMPRESS = (
    'png'
)

def get_file_extension(filename):
    return filename.split('.')[-1]


def get_content_type(filename):
    extension = get_file_extension(filename)
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
        '.map' not in node and # don't need 'em
        'service-worker' not in node and # don't understand 'em
        'asset-manifest' not in node # don't understand 'em
    )
    
    folders = (
        os.path.join(path, node) for node in os.listdir(path)
        if os.path.isdir(os.path.join(path, node))
    )

    for folder in folders:
        upload(folder)

    for filename in files:
        with open(filename, 'rb') as f:
            content_type = get_content_type(filename)
            print('uploading {} as {}... '.format(filename, content_type), end='')

            file_extension = get_file_extension(filename)
            should_compress = file_extension not in DO_NOT_COMPRESS
            if should_compress:
                f_compressed = BytesIO()
                with gzip.GzipFile(fileobj=f_compressed, mode='wb') as gz:
                    shutil.copyfileobj(f, gz)
                f_compressed.seek(0)
                f_upload = f_compressed
            else:
                f_upload = f

            file_metadata = {
                'ContentType': content_type, 
                'ACL': 'public-read'
            }
            if should_compress:
                file_metadata['ContentEncoding'] = 'gzip'
            key = filename.replace('build/', '').replace('\\', '/')
            bucket.upload_fileobj(f_upload, key, file_metadata)
            print('done')

if __name__ == '__main__':
    upload()